import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blacklist, TokenBlackListSchema } from './schemas/blacklist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Blacklist.name, schema: TokenBlackListSchema }
    ]),
  ],
  providers: [BlacklistService],
  exports: [BlacklistService]
})
export class BlacklistModule {}
