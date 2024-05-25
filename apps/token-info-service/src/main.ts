import { NestFactory } from '@nestjs/core';
import { TokenInfoServiceModule } from './token-info-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TokenInfoServiceModule);
  await app.listen(3000);
}
bootstrap();
