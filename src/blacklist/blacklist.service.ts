import { ForbiddenException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blacklist } from './schemas/blacklist.schema';
import { ClientSession, Model, } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectModel(Blacklist.name) private tokenBlacklistModel: Model<Blacklist>,
    private jwtService: JwtService, 
    @Inject(forwardRef(() => UsersService)) private readonly usersService: UsersService,
  ) { }

  async add(token: string, userId: string, expiresAt: Date, reason: string, session: ClientSession) {
    try {
      const exists = await this.tokenBlacklistModel.findOne({ token }).session(session);

      if (!exists)
        await this.tokenBlacklistModel.create([{ token, userId, expiresAt, reason }], { session });
    } catch (error) {
      if (error.code === 11000) return;
      throw error;
    }
  }

  async isBlacklisted(token: string): Promise<boolean> {
    const payload = await this.jwtService.decode(token);
    const now = Date.now();

    if (now > payload.exp)
      throw new ForbiddenException(`Token invalido`);

    const user = await this.usersService.findById(payload.user._id);
    const blacklistResult = await this.tokenBlacklistModel.findOne({ userId: user._id })

    if (blacklistResult)
      throw new ForbiddenException('Token invalido');

    if (user.tokenVersion !== payload.user.tokenVersion)
      throw new ForbiddenException('Token invalido')

    return false
  }
}
