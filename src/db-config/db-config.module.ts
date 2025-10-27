import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_DB_URL'),
                dbName: configService.get<string>('MONGO_DB_NAME'),
                authSource: configService.get<string>('MONGO_AUTH_SOURCE'),
            }),
            inject: [ConfigService],
        })
    ],
})
export class DbConfigModule { }
