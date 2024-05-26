import { NestFactory } from '@nestjs/core';
import { TokenInfoServiceModule } from './token-info-service.module';
import { ConfigService } from '@nestjs/config';
import { ThrottlerExceptionFilter } from './filters/throttler-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(TokenInfoServiceModule, {
    logger: ['error', 'log'],
  });

  const configService = app.get<ConfigService>(ConfigService);
  app.useGlobalFilters(new ThrottlerExceptionFilter());

  await app.listen(configService.get<string>('TOKEN_PORT'));
}
bootstrap();
