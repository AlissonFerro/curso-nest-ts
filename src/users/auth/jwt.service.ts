import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { User } from "../schemas/users.schema";
import * as jwt from 'jsonwebtoken'
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "src/interfaces/JwtPayload";

@Injectable()
export class JWTService {
    constructor(
        private configService: ConfigService,
        private jwtService: JwtService
    ) { }

    generateJWT(user: Partial<User>): string {
        const secret = this.configService.get('JWT_SECRET');
        const token = jwt.sign({
            user,
        }, secret, {
            expiresIn: '1day'
        });
        return token;
    }

    refreshTokenAndReturnTokenAndUser(tokenExp: string) {
        if (!tokenExp)
            throw new BadRequestException('O token é necessário');

        const payload = this.jwtService.decode(tokenExp);

        if (!payload?.user) {
            throw new UnauthorizedException('Payload do token inválido');
        }

        const { user, tokenVersion } = payload;
        user.tokenVersion += 1;
        const token = this.generateJWT(user);

        return { id: user, token, tokenVersion }
    }

    async verifyTokenAndReturnDecode(token: string): Promise<JwtPayload> {
        if (!token)
            throw new UnauthorizedException('No token provider')
        try {
            return await this.jwtService.verifyAsync(token, { secret: this.configService.get("JWT_SECRET") });
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException('Token inválido ou expirado');
        }
    }
}