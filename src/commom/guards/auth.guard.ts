import { CanActivate, ExecutionContext, forwardRef, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Types } from "mongoose";
import { BlacklistService } from "src/blacklist/blacklist.service";
import { JWTService } from "src/users/auth/jwt.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JWTService,
        private blacklistService: BlacklistService,
        @Inject(forwardRef(() => UsersService)) // Se for o caso
        private usersService: UsersService,
    ) { }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException('Token não fornecido');

        try {
            const payload = await this.jwtService.verifyTokenAndReturnDecode(token);

            const isBlacklisted = await this.blacklistService.isBlacklisted(token);
            if (isBlacklisted) throw new UnauthorizedException('Token revogado');

            const user = await this.usersService.findById(new Types.ObjectId(payload.user.sub));

            if (user.tokenVersion !== payload.user.tokenVersion) {
                throw new UnauthorizedException('Sessão expirada. Por favor, logue novamente.');
            }

            request['user'] = payload;
        } catch {
            throw new UnauthorizedException('Acesso negado');
        }
        return true;
    }
}
