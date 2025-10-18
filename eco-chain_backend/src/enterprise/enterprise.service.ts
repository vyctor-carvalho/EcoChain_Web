import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';

import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { Enterprise } from './entities/enterprise.entity';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private readonly enterpriseRepository: Repository<Enterprise>,
  ) {}

  /**
   * Cria uma nova empresa no banco de dados.
   */
  async create(createEnterpriseDto: CreateEnterpriseDto): Promise<Enterprise> {
    const { authLogin, cnpj, ...enterpriseData } = createEnterpriseDto;

    // 1. Verifica se o email já está em uso
    const emailExists = await this.findOneByEmail(authLogin.email);
    if (emailExists) {
      throw new ConflictException(`O email "${authLogin.email}" já está em uso.`);
    }

    // 2. Verifica se o CNPJ já está em uso
    const cnpjExists = await this.findOneByCnpj(cnpj);
    if (cnpjExists) {
      throw new ConflictException(`O CNPJ "${cnpj}" já está cadastrado.`);
    }

    // 3. Cria um hash da senha antes de salvar
    const hashedPassword = await hash(authLogin.password, 10);

    // 4. Cria a nova entidade com os dados validados e hasheados
    const newEnterprise = this.enterpriseRepository.create({
      ...enterpriseData,
      cnpj,
      authLogin: {
        email: authLogin.email,
        password: hashedPassword,
      },
    });

    // 5. Salva a entidade no banco
    return await this.enterpriseRepository.save(newEnterprise);
  }

  /**
   * Retorna todas as empresas cadastradas.
   */
  async findAll(): Promise<Enterprise[]> {
    return this.enterpriseRepository.find();
  }

  /**
   * Busca uma empresa pelo seu ID (UUID).
   */
  async findOne(id: string): Promise<Enterprise> {
    const enterprise = await this.enterpriseRepository.findOneBy({ id });
    if (!enterprise) {
      throw new NotFoundException(`Empresa com ID "${id}" não encontrada.`);
    }
    return enterprise;
  }

  /**
   * Busca uma empresa pelo seu email. Método auxiliar.
   */
  findOneByEmail(email: string): Promise<Enterprise | null> {
    return this.enterpriseRepository.findOne({
      where: {
        authLogin: {
          email: email,
        },
      },
    });
  }

  /**
   * Busca uma empresa pelo seu CNPJ. Método auxiliar.
   */
  findOneByCnpj(cnpj: string): Promise<Enterprise | null> {
    return this.enterpriseRepository.findOneBy({ cnpj });
  }

  /**
   * Atualiza os dados de uma empresa existente.
   */
  async update(id: string, updateEnterpriseDto: UpdateEnterpriseDto): Promise<Enterprise> {
    // 1. Garante que a empresa que vamos editar existe
    const enterpriseToUpdate = await this.findOne(id);

    // 2. Desestrutura o DTO para facilitar a manipulação
    const { authLogin, cnpj, ...otherData } = updateEnterpriseDto;

    // 3. Verifica conflitos de email e CNPJ se eles foram fornecidos
    if (authLogin?.email) {
      const emailOwner = await this.findOneByEmail(authLogin.email);
      if (emailOwner && emailOwner.id !== id) {
        throw new ConflictException(`O email "${authLogin.email}" já está em uso.`);
      }
    }
    if (cnpj) {
      const cnpjOwner = await this.findOneByCnpj(cnpj);
      if (cnpjOwner && cnpjOwner.id !== id) {
        throw new ConflictException(`O CNPJ "${cnpj}" já pertence a outra empresa.`);
      }
    }

    // 4. Faz o merge dos dados antigos com os novos dados
    const updatedData = { ...enterpriseToUpdate, ...otherData };
    if (cnpj) {
      updatedData.cnpj = cnpj;
    }
    if (authLogin?.email) {
      updatedData.authLogin.email = authLogin.email;
    }
    if (authLogin?.password) {
      updatedData.authLogin.password = await hash(authLogin.password, 10);
    }
    
    // 5. Salva as alterações no banco de dados
    await this.enterpriseRepository.save(updatedData);

    // Retorna a entidade atualizada (sem a senha)
    return this.findOne(id);
  }

  /**
   * Remove uma empresa do banco de dados.
   */
  async remove(id: string): Promise<DeleteResult> {
    const enterprise = await this.findOne(id); // Garante que a empresa existe antes de deletar
    return this.enterpriseRepository.delete(enterprise.id);
  }

  /**
   * Gera o hash e salva o refresh token para uma empresa específica.
   * Este método deve ser chamado durante o processo de login.
   * @param refreshToken - O token de atualização gerado.
   * @param enterpriseId - O ID da empresa.
   */
  async setCurrentRefreshToken(refreshToken: string, enterpriseId: string): Promise<void> {
    // Gera o hash do token para armazenamento seguro
    const hashedRefreshToken = await hash(refreshToken, 10);

    // Atualiza a empresa no banco com o novo hash
    await this.enterpriseRepository.update(enterpriseId, {
      currentHashedRefreshToken: hashedRefreshToken,
    });
  }

  /**
   * Busca uma empresa e verifica se o refresh token fornecido corresponde ao hash salvo.
   * Este é o método que você solicitou, usado para validar o token ao tentar renovar o acesso.
   * @param refreshToken - O token de atualização enviado pelo cliente.
   * @param enterpriseId - O ID da empresa.
   * @returns A entidade Enterprise se o token for válido, caso contrário, null.
   */
  async getUserIfRefreshTokenMatches(refreshToken: string, enterpriseId: string): Promise<Enterprise | null> {
    // Busca a empresa pelo ID
    const enterprise = await this.findOne(enterpriseId);

    // Garante que a empresa e o hash do token existam
    if (!enterprise || !enterprise.currentHashedRefreshToken) {
      return null;
    }

    // Compara o token recebido (puro) com o hash salvo no banco
    const isRefreshTokenMatching = await compare(
      refreshToken,
      enterprise.currentHashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return enterprise;
    }

    return null;
  }

  /**
   * Remove o refresh token de uma empresa.
   * Este método deve ser chamado durante o logout.
   * @param enterpriseId - O ID da empresa.
   */
  async removeRefreshToken(enterpriseId: string): Promise<any> {
    return this.enterpriseRepository.update(enterpriseId, {
      currentHashedRefreshToken: undefined, // Define o campo como nulo no banco
    });
  }
}