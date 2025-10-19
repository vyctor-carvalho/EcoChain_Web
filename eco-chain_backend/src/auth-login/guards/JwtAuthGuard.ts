import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 1. Injete o Reflector para ler os metadados dos decorators
  constructor(private reflector: Reflector) {
    super();
  }

  // 2. Sobrescreva o método canActivate para adicionar a lógica do @Public
  canActivate(context: ExecutionContext) {
    // 3. Verifique se o decorator @Public() está na rota
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(), // Verifica o decorator na rota específica (ex: @Get())
      context.getClass(),   // Verifica o decorator no controller inteiro (ex: @Controller())
    ]);

    // Se a rota for pública, permita o acesso imediatamente
    if (isPublic) {
      return true;
    }

    // Se não for pública, execute a validação padrão do JWT
    // Isso vai chamar a sua JwtStrategy para validar o token
    return super.canActivate(context);
  }
}