import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

async function bootstrapSwagger() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Simple Payment Gateway API')
    .setDescription('A comprehensive payment gateway API built with NestJS and MongoDB')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'authorization',
        in: 'header',
        description: 'Enter token',
      },
      'authorization',
    )
    .addTag('Authentication', 'User authentication endpoints')
    .addTag('Users', 'User management endpoints')
    .addTag('Merchants', 'Merchant management endpoints')
    .addTag('Transactions', 'Transaction processing endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(4000, () => {
    console.log(`Swagger documentation available at: http://localhost:4000/docs`);
  });
}

bootstrapSwagger();
