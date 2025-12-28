import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuditLog } from './schemas/audit-logs.schema';
import { AuditLogInterface } from 'src/interfaces/AuditLogs';

@Injectable()
export class AuditLogsService {
  constructor(@InjectModel(AuditLog.name) private auditLog: Model<AuditLog>){ }

  async add(auditLogs: AuditLogInterface) {
    try { 
      await this.auditLog.create({
        userId: auditLogs.userId,
        action: auditLogs.action,
        status: auditLogs.status,
        resource: auditLogs.resource,
        resourceId: auditLogs.resourceId,
        ipAddress: auditLogs.ipAddress
      })
    } catch (error) {
      throw error
    }
  }
}
