import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response-handler/response-handler.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT') ?? 3000;

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(PORT, () => {
    console.log(`Application is running on: http://localhost:${PORT}/api`);
  });
}
bootstrap();
