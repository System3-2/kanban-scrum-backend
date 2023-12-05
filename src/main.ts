import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );
  await app.listen(
    process.env.NODE_ENV !== 'production' ? process.env.PORT : 3000,
  );
  console.log(`server running on ${process.env.PORT}`);
  console.log(`current environment is  ${process.env.NODE_ENV}`);
}
bootstrap();
