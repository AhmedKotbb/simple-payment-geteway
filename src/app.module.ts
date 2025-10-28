import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DbConfigModule } from './db-config/db-config.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { MerchantModule } from './modules/merchant/merchant.module';
import { TransactionModule } from './modules/transaction/transaction.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbConfigModule,
    UserModule,
    AuthModule,
    MerchantModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
