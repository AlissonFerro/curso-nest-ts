import { Module } from '@nestjs/common';
import { AuditLogsService } from './audit-logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditLog, AuditLogSchema } from './schemas/audit-logs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuditLog.name, schema: AuditLogSchema }
    ]),
  ],
  providers: [AuditLogsService],
  exports: [AuditLogsService]
})
export class AuditLogsModule { }
