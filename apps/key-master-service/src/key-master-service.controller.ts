import { Controller, Get } from '@nestjs/common';
import { KeyMasterServiceService } from './key-master-service.service';

@Controller()
export class KeyMasterServiceController {
  constructor(
    private readonly keyMasterServiceService: KeyMasterServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.keyMasterServiceService.getHello();
  }
}
