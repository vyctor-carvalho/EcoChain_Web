import { Injectable, NotFoundException } from '@nestjs/common';
import { EnterpriseService } from 'src/enterprise/enterprise.service';
import { EmployeeService } from 'src/employee/employee.service'; 
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Enterprise } from 'src/enterprise/entities/enterprise.entity';
import { Employee } from 'src/employee/entities/employee.entity';

// Define um tipo para representar qualquer tipo de usuário
type User = Enterprise | Employee;

@Injectable()
export class AuthLoginService {
  constructor(
    private readonly enterpriseService: EnterpriseService,
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Valida o usuário tentando encontrar em ambas as entidades (Enterprise e Employee).
   */
  async validateUser(email: string, password: string): Promise<User> {
    // 3. Tenta encontrar o usuário primeiro como uma empresa
    let user: User | null = await this.enterpriseService.findOneByEmail(email);

    // Se não encontrar como empresa, tenta como funcionário
    if (!user) {
      user = await this.employeeService.findOneByEmail(email);
    }

    // Se encontrou um usuário (de qualquer tipo) e a senha corresponde, retorna o usuário
    if (user && (await compare(password, user.authLogin.password))) {
      return user;
    }

    // Se não encontrou ou a senha está incorreta, lança a exceção
    throw new NotFoundException('Email ou senha incorretos.');
  }

  /**
   * Gera os tokens de login para um usuário (Enterprise ou Employee).
   */
  async login(user: User) {
    // 4. Identifica o tipo de usuário e define o payload do JWT
    const isEnterprise = 'cnpj' in user; // 'cnpj' só existe em Enterprise
    const userType = isEnterprise ? 'enterprise' : 'employee';
    
    const payload = {
      sub: user.id,
      email: user.authLogin.email,
      name: user.name,
      type: userType, 
      role: user.role,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get('JWT_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_SECRET'),
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
      }),
    ]);

    // 5. Salva o refresh token no serviço correto
    if (isEnterprise) {
      await this.enterpriseService.setCurrentRefreshToken(refresh_token, user.id);
    } else {
      await this.employeeService.setCurrentRefreshToken(refresh_token, user.id);
    }

    return {
      access_token,
      refresh_token,
    };
  }

  async refresh(user: User) {
    return this.login(user);
  }

  /**
   * Remove o refresh token do usuário correto durante o logout.
   */
  async logout(userId: string, userType: 'enterprise' | 'employee') {
    // 6. Usa o userType (que virá do payload do JWT) para chamar o serviço correto
    if (userType === 'enterprise') {
      return this.enterpriseService.removeRefreshToken(userId);
    } else {
      return this.employeeService.removeRefreshToken(userId);
    }
  }
}