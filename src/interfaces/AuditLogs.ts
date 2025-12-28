import { Types } from "mongoose";

export interface AuditLogInterface {
  userId: Types.ObjectId | undefined, 
  action: string, 
  status: string, 
  resource: string, 
  resourceId: Types.ObjectId | undefined, 
  ipAddress: string
}