import { Injectable } from '@nestjs/common';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuditLog } from './schemas/audit-logs.schema';

@Injectable()
export class AuditLogsService {
  constructor(@InjectModel(AuditLog.name) private auditLog: Model<AuditLog>){ }

  async add(userId: Types.ObjectId, action: string, status: string, resource: string, resourceId: Types.ObjectId ) {
    try {
      await this.auditLog.create({
        userId, action, status, resource, resourceId
      })
    } catch (error) {
      throw error
    }
  }
}
