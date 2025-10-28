import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Merchant, MerchantSchema } from 'src/db-config/schemas/merchant.schema';
import { MerchantRepository } from 'src/db-config/repositories/merchant.repository';
import { Transaction, TransactionSchema } from 'src/db-config/schemas/transactions-schema';
import { TransactionRepository } from 'src/db-config/repositories/transaction.repository';
import { User, UserSchema } from 'src/db-config/schemas/user.schema';
import { UserRepository } from 'src/db-config/repositories/user.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Merchant.name, schema: MerchantSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [TransactionController],
  providers: [TransactionService, MerchantRepository, TransactionRepository, UserRepository]
})
export class TransactionModule {}
