import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response-handler/response-handler.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT') ?? 3000;

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseInterceptor());

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

  await app.listen(PORT, () => {
    console.log(`Application is running on: http://localhost:${PORT}/api`);
    console.log(`Swagger documentation available at: http://localhost:${PORT}/docs`);
  });
}
bootstrap();
