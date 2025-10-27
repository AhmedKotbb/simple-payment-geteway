import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from 'src/db-config/repositories/user.repository';
import { User, UserSchema } from 'src/db-config/schemas/user.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository]
})
export class UserModule {}
