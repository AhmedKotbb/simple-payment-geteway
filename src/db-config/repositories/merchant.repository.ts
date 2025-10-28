import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginatedResult, PaginationOptions } from 'src/modules/user/DOTs/user.interfaces';
import { Merchant, MerchantDocument } from '../schemas/merchant.schema';

@Injectable()
export class MerchantRepository {
  constructor(@InjectModel(Merchant.name) private readonly merchantModel: Model<MerchantDocument>) {}

  async create(merchantData: Partial<Merchant>): Promise<Merchant> {
    const merchant = new this.merchantModel(merchantData);
    return merchant.save();
  }

  async findAll(options: PaginationOptions = {}): Promise<PaginatedResult<Merchant>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.merchantModel.find({}, { __v: 0 })
        .populate('userId', '-hashedPassword') // exclude hashedPassword
        .skip(skip)
        .limit(limit)
        .exec(),
      this.merchantModel.countDocuments().exec(),
    ]);

    return {
      documents: data,
      totalItems: total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Merchant | null> {
    return this.merchantModel.findById(id)
      .populate('userId', '-hashedPassword')
      .exec();
  }

  async findByName(name: string): Promise<Merchant | null> {
    return this.merchantModel.findOne({name})
    .populate('userId', '-hashedPassword')
    .exec();
  }

  async findByUserId(userId: string | Types.ObjectId): Promise<Merchant | null> {
    return this.merchantModel.findOne({ userId })
      .populate('userId', '-hashedPassword')
      .exec();
  }

  async update(id: string, updateData: Partial<Merchant>): Promise<Merchant | null> {
    return this.merchantModel.findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Merchant | null> {
    return this.merchantModel.findByIdAndDelete(id).exec();
  }
}
