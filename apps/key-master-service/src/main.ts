import { NestFactory } from '@nestjs/core';
import { KeyMasterServiceModule } from './key-master-service.module';

async function bootstrap() {
  const app = await NestFactory.create(KeyMasterServiceModule);
  await app.listen(3000);
}
bootstrap();
