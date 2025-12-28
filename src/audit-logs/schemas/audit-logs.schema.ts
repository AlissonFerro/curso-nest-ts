import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true, collection: 'audit_logs' })
export class AuditLog extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', index: true })
  userId?: Types.ObjectId;

  @Prop({ required: true, index: true })
  action: string; 

  @Prop({ required: true, index: true })
  resource: string; 

  @Prop({ type: Types.ObjectId })
  resourceId?: Types.ObjectId;

  @Prop({ type: Object })
  oldValues: any;

  @Prop({ type: Object })
  newValues: any;

  @Prop({ required: true, enum: ['SUCCESS', 'FAILED'] })
  status: string;

  @Prop()
  ipAddress: string;

  @Prop()
  userAgent: string;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);