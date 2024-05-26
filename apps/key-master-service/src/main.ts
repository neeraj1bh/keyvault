import { NestFactory } from '@nestjs/core';
import { KeyMasterServiceModule } from './key-master-service.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(KeyMasterServiceModule, {
    logger: ['error', 'log'],
  });

  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(configService.get<string>('KEY_PORT'));
}
bootstrap();
