import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({ timestamps: true })

export class Blacklist extends Document {
    @Prop({ required: true, index: true, unique: true })
    token: string;

    @Prop()
    expiresAt: Date

    @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true, unique: false })
    userId: Types.ObjectId

    @Prop({ enum: ["LOGOUT", "PASSWORD_CHANGE", "SESSION_REVOKED", "SECURITY_BREACH"] })
    reason: string

    @Prop()
    IP: string
}

export const TokenBlackListSchema = SchemaFactory.createForClass(Blacklist)

TokenBlackListSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });