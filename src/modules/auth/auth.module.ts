import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/db-config/schemas/user.schema';
import { UserRepository } from 'src/db-config/repositories/user.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository]
})
export class AuthModule {}
