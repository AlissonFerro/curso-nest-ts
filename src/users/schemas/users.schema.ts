import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) 

export class User extends Document {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  lastname: string

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop()
  avatarUrl?: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ default: 'user', enum: ['user', 'admin', 'editor'] })
  role: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ select: false })
  refreshTokenHash?: string;

  @Prop({ default: 0 })
  tokenVersion: number; 

  @Prop()
  passwordResetToken?: string;

  @Prop()
  passwordResetExpires?: Date;

  @Prop({ default: null })
  deletedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
