import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.schema'; // Adjust the path if needed

export type MerchantDocument = Merchant & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Merchant {
    @Prop({ required: true, type: String, default: () => uuidv4(), unique: true })
    id: string;

    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    userId: Types.ObjectId; // Mongoose ObjectId reference to User

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true, default: 'EGP' })
    currency: string;

    @Prop({ required: true, default: 0 })
    balance: number;

    @Prop({ default: Date.now, immutable: true })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const MerchantSchema = SchemaFactory.createForClass(Merchant);
