import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLE_KEY } from "../decorators/roles.decorator";
import { SystemRoles } from "../enums/role.enum"; // É uma boa prática usar o enum aqui também

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // Pega os papéis necessários que definimos com @Roles(...) na rota
        const requiredRoles = this.reflector.getAllAndOverride<SystemRoles[]>(ROLE_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        // Se nenhuma role é necessária para a rota, o guard permite o acesso.
        // A proteção de autenticação (se o usuário está logado) é feita pelo AuthGuard.
        if (!requiredRoles) {
            return true;
        }

        // Pega o usuário que foi anexado na requisição pelo JwtAuthGuard
        const { user } = context.switchToHttp().getRequest();

        // Verificação de segurança: se não houver usuário ou se o usuário não tiver uma role, nega o acesso.
        if (!user || !user.role) {
            return false;
        }
        
        // Verifica se a lista de papéis requeridos (`requiredRoles`)
        // inclui o único papel que o usuário possui (`user.role`).
        return requiredRoles.includes(user.role);
    }
}