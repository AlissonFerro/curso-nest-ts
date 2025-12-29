import { forwardRef, Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blacklist, TokenBlackListSchema } from './schemas/blacklist.schema';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    // 1. Resolve o erro do JWTService no índice [1]
    JwtModule.register({}),

    // 2. Resolve a dependência circular com UsersModule
    forwardRef(() => UsersModule),

    // 3. Configuração do Mongoose
    MongooseModule.forFeature([
      { name: Blacklist.name, schema: TokenBlackListSchema }
    ]),
  ],
  providers: [BlacklistService],
  exports: [BlacklistService], // Permite que o UsersService use o BlacklistService
})
export class BlacklistModule { }