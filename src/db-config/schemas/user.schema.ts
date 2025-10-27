import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type UserDocument = User & Document;

export enum UserRole {
  ADMIN = 'admin',
  PARTNER = 'partner',
  MERCHANT = 'merchant',
}

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class User {
  @Prop({ required: true, type: String, default: () => uuidv4(), unique: true })
  id: string;

  @Prop({ type: String, default: null, })
  activeTokenID: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ required: true })
  hashedPassword: string;

  @Prop({ default: Date.now, immutable: true })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
