import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blacklist } from './schemas/blacklist.schema';
import { ClientSession, Model } from 'mongoose';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectModel(Blacklist.name)
    private tokenBlacklistModel: Model<Blacklist>,
  ) { }

  async add(token: string, userId: string, expiresAt: Date, reason: string, session: ClientSession) {
    try {
      const exists = await this.tokenBlacklistModel.findOne({ token }).session(session);
      
      if(!exists)
        await this.tokenBlacklistModel.create([{ token, userId, expiresAt, reason }], { session });
    } catch (error) {
      if (error.code === 11000) return;
      throw error;
    }
  }
}
