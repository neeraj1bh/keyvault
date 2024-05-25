import { Module } from '@nestjs/common';
import { KeyMasterServiceController } from './key-master-service.controller';
import { KeyMasterServiceService } from './key-master-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [KeyMasterServiceController],
  providers: [KeyMasterServiceService],
})
export class KeyMasterServiceModule {}
