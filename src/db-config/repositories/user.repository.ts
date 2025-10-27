import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginatedResult, PaginationOptions } from 'src/modules/user/DOTs/user.interfaces';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(userData: Partial<User>): Promise<User> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findAll(options: PaginationOptions = {}): Promise<PaginatedResult<User>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.userModel.find({}, { hashedPassword: 0, __v: 0 })
      .skip(skip).
      limit(limit).
      exec(),
      this.userModel.countDocuments().exec(),
    ]);

    return {
      documents: data,
      totalItems: total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateData: Partial<User>): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
