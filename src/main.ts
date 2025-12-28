import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  const server = app.getHttpAdapter().getInstance().set('trust proxy', true);
  server.set('trust proxy', 1)

  await app.listen(8080);
}
bootstrap();
