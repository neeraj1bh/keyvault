import { NestFactory } from '@nestjs/core';
import { KeyMasterServiceModule } from './key-master-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(KeyMasterServiceModule, {
    logger: ['error', 'log'],
  });

  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get<string>('KEY_PORT'));
}
bootstrap();
