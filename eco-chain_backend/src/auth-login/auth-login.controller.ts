import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthLoginService } from './auth-login.service';
import { CreateAuthLoginDto } from './dto/create-auth-login.dto';
import { UpdateAuthLoginDto } from './dto/update-auth-login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthLoginController {
  constructor(private readonly authLoginService: AuthLoginService) {}
 
  @Post("login")
  async login(@Body() createAuthLoginDto: CreateAuthLoginDto) {
    const user = await this.authLoginService.validateUser(createAuthLoginDto.email, createAuthLoginDto.password);
    return this.authLoginService.login(user);
  }

  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authLoginService.refresh(req.user);
  }

  @Post('logout')
  async logout(@Request() req) {
    return this.authLoginService.logout(req.user.id);
  }
}
