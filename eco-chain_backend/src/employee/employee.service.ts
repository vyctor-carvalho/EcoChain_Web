import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  /**
   * Cria um novo empregado no banco de dados.
   */
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { authLogin, cpf, ...employeeData } = createEmployeeDto;

    // 1. Verifica se o email já está em uso
    const emailExists = await this.findOneByEmail(authLogin.email);
    if (emailExists) {
      throw new ConflictException(`O email "${authLogin.email}" já está em uso.`);
    }

    // 2. Verifica se o CPF já está em uso
    const cpfExists = await this.findOneByCpf(cpf);
    if (cpfExists) {
      throw new ConflictException(`O CPF "${cpf}" já está cadastrado.`);
    }

    // 3. Cria um hash da senha antes de salvar
    const hashedPassword = await hash(authLogin.password, 10);

    // 4. Cria a nova entidade com os dados validados e hasheados
    const newEmployee = this.employeeRepository.create({
      ...employeeData,
      cpf,
      authLogin: {
        email: authLogin.email,
        password: hashedPassword,
      },
    });

    // 5. Salva a entidade no banco
    const savedEmployee = await this.employeeRepository.save(newEmployee);
    
    // Remove a senha do objeto de retorno por segurança
    return savedEmployee;
  }

  /**
   * Retorna todos os empregados cadastrados.
   */
  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  /**
   * Busca um empregado pelo seu ID (UUID).
   */
  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException(`Empregado com ID "${id}" não encontrado.`);
    }
    return employee;
  }

  /**
   * Busca um empregado pelo seu email. Método auxiliar.
   */
  findOneByEmail(email: string): Promise<Employee | null> {
    return this.employeeRepository.findOne({
      where: {
        authLogin: {
          email: email,
        },
      },
    });
  }

  /**
   * Busca um empregado pelo seu CPF. Método auxiliar.
   */
  findOneByCpf(cpf: string): Promise<Employee | null> {
    return this.employeeRepository.findOneBy({ cpf });
  }

  /**
   * Atualiza os dados de um empregado existente.
   */
  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    // 1. Usa o preload para carregar o empregado e mesclar os novos dados
    const employeeToUpdate = await this.employeeRepository.preload({
      id,
      ...updateEmployeeDto,
    });
    
    if (!employeeToUpdate) {
        throw new NotFoundException(`Empregado com ID "${id}" não encontrado.`);
    }

    const { authLogin, cpf } = employeeToUpdate;

    // 2. Verifica conflitos de email e CPF se eles foram fornecidos
    if (authLogin?.email) {
      const emailOwner = await this.findOneByEmail(authLogin.email);
      if (emailOwner && emailOwner.id !== id) {
        throw new ConflictException(`O email "${authLogin.email}" já está em uso.`);
      }
    }
    if (cpf) {
      const cpfOwner = await this.findOneByCpf(cpf);
      if (cpfOwner && cpfOwner.id !== id) {
        throw new ConflictException(`O CPF "${cpf}" já pertence a outro empregado.`);
      }
    }

    // 3. Se uma nova senha for fornecida, cria o hash
    if (authLogin?.password) {
        employeeToUpdate.authLogin.password = await hash(authLogin.password, 10);
    }
    
    // 4. Salva as alterações no banco de dados
    const updatedEmployee = await this.employeeRepository.save(employeeToUpdate);

    return updatedEmployee;
  }

  /**
   * Remove um empregado do banco de dados.
   */
  async remove(id: string): Promise<DeleteResult> {
    await this.findOne(id); // Garante que o empregado existe antes de deletar
    return this.employeeRepository.delete(id);
  }

  /**
   * Gera o hash e salva o refresh token para um empregado específico.
   */
  async setCurrentRefreshToken(refreshToken: string, employeeId: string): Promise<void> {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.employeeRepository.update(employeeId, {
      currentHashedRefreshToken: hashedRefreshToken,
    });
  }

  /**
   * Busca um empregado e verifica se o refresh token fornecido corresponde ao hash salvo.
   */
  async getUserIfRefreshTokenMatches(refreshToken: string, employeeId: string): Promise<Employee | null> {
    const employee = await this.findOne(employeeId);

    if (!employee || !employee.currentHashedRefreshToken) {
      return null;
    }

    const isRefreshTokenMatching = await compare(
      refreshToken,
      employee.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return employee;
    }

    return null;
  }

  /**
   * Remove o refresh token de um empregado (efetua o logout).
   */
  async removeRefreshToken(employeeId: string): Promise<any> {
    return this.employeeRepository.update(employeeId, {
      currentHashedRefreshToken: undefined,
    });
  }
}