import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Roles } from 'src/auth-login/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth-login/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth-login/guards/JwtAuthGuard';
import { managerAndAbouveRoles, auditorAndAbouveRoles } from 'src/auth-login/autorized_roles/autorized_roles';

@Controller('employee')
@UseGuards(JwtAuthGuard, RolesGuard) // Aplica para todas as rotas do controller
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  /**
   * Cria um novo empregado.
   * Apenas Admins e Managers podem criar novos usuários.
   */
  @Post()
  @Roles(...managerAndAbouveRoles) // Equivalente a 'admin', 'manager'
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  /**
   * Lista todos os empregados.
   * Auditores, Managers e Admins podem ver a lista completa.
   */
  @Get()
  @Roles(...auditorAndAbouveRoles) // Equivalente a 'admin', 'manager', 'auditor'
  findAll() {
    return this.employeeService.findAll();
  }

  /**
   * Busca um empregado específico.
   * Auditores, Managers e Admins podem buscar qualquer usuário.
   * (Nota: uma lógica mais avançada permitiria a um 'operational' buscar a si mesmo)
   */
  @Get(':id')
  @Roles(...auditorAndAbouveRoles)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.findOne(id);
  }

  /**
   * Atualiza um empregado.
   * Apenas Admins e Managers podem modificar dados de usuários.
   */
  @Patch(':id')
  @Roles(...managerAndAbouveRoles)
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  /**
   * Remove um empregado.
   * Apenas Admins podem realizar esta ação destrutiva.
   */
  @Delete(':id')
  @Roles('admin') // Apenas a role 'admin'
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.employeeService.remove(id);
  }
}