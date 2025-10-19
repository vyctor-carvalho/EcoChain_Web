import { Controller, Post, Body, UseGuards, Req, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth-login/guards/JwtAuthGuard';
import { Roles } from './decorators/roles.decorator';
import { Public } from './decorators/public.decorator';
import { RolesGuard } from './guards/roles.guard';
import { allRoles } from './autorized_roles/autorized_roles';

@Controller('auth')
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) {}

  /**
   * Endpoint de login.
   * Deve ser público para que qualquer um possa tentar se autenticar.
   */
  @Public() // Marca esta rota como pública, ignorando o RolesGuard global
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req) {
    return this.authLoginService.login(req.user);
  }

  /**
   * Endpoint de logout.
   * Requer que o usuário esteja autenticado. Qualquer role pode fazer logout.
   */
  @Post('logout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(...allRoles) // Permite que qualquer usuário autenticado faça logout
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req) {
    const { sub: userId, type: userType } = req.user;
    return this.authLoginService.logout(userId, userType);
  }

  /**
   * Endpoint para renovar o token de acesso.
   * Requer um refresh token válido.
   */
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req) {
    return this.authLoginService.refresh(req.user);
  }
}