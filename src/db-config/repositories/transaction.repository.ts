import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction, TransactionDocument, TransactionStatus } from '../schemas/transactions-schema';

export interface PaginatedResult<T> {
  documents: T[];
  totalItems: number;
  page: number;
  totalPages: number;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async create(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction = new this.transactionModel(transactionData);
    return transaction.save();
  }

  async findAll(options: PaginationOptions = {}): Promise<PaginatedResult<Transaction>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.transactionModel.find()
        .skip(skip)
        .limit(limit)
        .populate('merchantId') // populates merchant reference
        .exec(),
      this.transactionModel.countDocuments().exec(),
    ]);

    return {
      documents: data,
      totalItems: total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactionModel.findById(id).populate('merchantId').exec();
  }

  async findByMerchant(merchantId: string, options: PaginationOptions = {}): Promise<PaginatedResult<Transaction>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.transactionModel.find({ merchantId: new Types.ObjectId(merchantId) })
        .skip(skip)
        .limit(limit)
        .populate('merchantId')
        .exec(),
      this.transactionModel.countDocuments({ merchantId: new Types.ObjectId(merchantId) }).exec(),
    ]);

    return {
      documents: data,
      totalItems: total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async updateStatus(id: string, status: TransactionStatus): Promise<Transaction | null> {
    return this.transactionModel.findOneAndUpdate(new Types.ObjectId(id), { status }, { new: true }).exec();
  }
}
