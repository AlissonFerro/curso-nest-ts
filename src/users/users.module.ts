import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { HashService } from './auth/hash.service';
import { JWTService } from './auth/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { BlacklistModule } from 'src/blacklist/blacklist.module';
import { AuditLogsModule } from 'src/audit-logs/audit-logs.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({}),
    AuditLogsModule,
    forwardRef(() => BlacklistModule)
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    HashService,
    JWTService
  ],
  exports: [UsersService],
})

export class UsersModule { }