import { Module } from '@nestjs/common';
import { KeyMasterServiceController } from './key-master-service.controller';
import { KeyMasterServiceService } from './key-master-service.service';

@Module({
  imports: [],
  controllers: [KeyMasterServiceController],
  providers: [KeyMasterServiceService],
})
export class KeyMasterServiceModule {}
