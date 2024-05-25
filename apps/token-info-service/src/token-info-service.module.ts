import { Module } from '@nestjs/common';
import { TokenInfoServiceController } from './token-info-service.controller';
import { TokenInfoServiceService } from './token-info-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [TokenInfoServiceController],
  providers: [TokenInfoServiceService],
})
export class TokenInfoServiceModule {}
