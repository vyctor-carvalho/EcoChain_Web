import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

// 1. Importações de segurança
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth-login/guards/roles.guard';
import { Roles } from 'src/auth-login/decorators/roles.decorator';
import { Public } from 'src/auth-login/decorators/public.decorator';
import { managerAndAbouveRoles } from 'src/auth-login/autorized_roles/autorized_roles';
import { JwtAuthGuard } from 'src/auth-login/guards/JwtAuthGuard';

@Controller('enterprise')
@UseGuards(JwtAuthGuard, RolesGuard) // 2. Protege todas as rotas por padrão
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  /**
   * Endpoint público para registrar uma nova empresa.
   */
  @Public() // 3. Marca esta rota como pública, ignorando a proteção global
  @Post('/register')
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.create(createEnterpriseDto);
  }

  /**
   * Retorna todas as empresas. Apenas Admins e Managers podem acessar.
   */
  @Get()
  @Roles(...managerAndAbouveRoles) // 4. Apenas 'admin' e 'manager'
  findAll() {
    return this.enterpriseService.findAll();
  }

  /**
   * Retorna uma empresa específica. Apenas Admins e Managers podem acessar.
   */
  @Get(':id')
  @Roles(...managerAndAbouveRoles)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.enterpriseService.findOne(id);
  }

  /**
   * Atualiza uma empresa. Apenas Admins e Managers podem acessar.
   */
  @Patch(':id')
  @Roles(...managerAndAbouveRoles)
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEnterpriseDto: UpdateEnterpriseDto) {
    return this.enterpriseService.update(id, updateEnterpriseDto);
  }

  /**
   * Remove uma empresa. Ação restrita apenas a Admins.
   */
  @Delete(':id')
  @Roles('admin') // 5. Ação mais restrita
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.enterpriseService.remove(id);
  }
}