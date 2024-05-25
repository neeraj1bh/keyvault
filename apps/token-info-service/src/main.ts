import { NestFactory } from '@nestjs/core';
import { TokenInfoServiceModule } from './token-info-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(TokenInfoServiceModule, {
    logger: ['error', 'log'],
  });

  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get<string>('KEY_MICROSERVICE_URL'));
}
bootstrap();
