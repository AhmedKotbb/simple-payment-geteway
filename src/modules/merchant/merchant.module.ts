import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MerchantController } from './merchant.controller';
import { MerchantService } from './merchant.service';
import { Merchant, MerchantSchema } from 'src/db-config/schemas/merchant.schema';
import { MerchantRepository } from 'src/db-config/repositories/merchant.repository';
import { User, UserSchema } from 'src/db-config/schemas/user.schema';
import { UserRepository } from 'src/db-config/repositories/user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Merchant.name, schema: MerchantSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [MerchantController],
  providers: [MerchantService, MerchantRepository, UserRepository]
})
export class MerchantModule {}
