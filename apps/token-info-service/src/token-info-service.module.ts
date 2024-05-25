import { Module } from '@nestjs/common';
import { TokenInfoServiceController } from './token-info-service.controller';
import { TokenInfoServiceService } from './token-info-service.service';

@Module({
  imports: [],
  controllers: [TokenInfoServiceController],
  providers: [TokenInfoServiceService],
})
export class TokenInfoServiceModule {}
