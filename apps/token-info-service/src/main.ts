import { NestFactory } from '@nestjs/core';
import { TokenInfoServiceModule } from './token-info-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(TokenInfoServiceModule, {
    logger: ['error', 'log'],
  });

  const configService = app.get<ConfigService>(ConfigService);

  console.log(configService.get<string>('TOKEN_PORT'));
  await app.listen(configService.get<string>('TOKEN_PORT'));
}
bootstrap();
