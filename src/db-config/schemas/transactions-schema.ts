import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Merchant } from './merchant.schema'; // adjust the path accordingly

export type TransactionDocument = Transaction & Document;

export enum TransactionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
}

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Transaction {
  @Prop({ required: true, type: String, default: () => uuidv4(), unique: true })
  id: string;

  @Prop({ type: Types.ObjectId, ref: Merchant.name, required: true })
  merchantId: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true, length: 4 })
  cardLast4: string;

  @Prop({ required: true, enum: TransactionStatus, default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @Prop({ default: Date.now, immutable: true })
  createdAt: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
