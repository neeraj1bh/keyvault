import { Controller, Get } from '@nestjs/common';
import { TokenInfoServiceService } from './token-info-service.service';

@Controller()
export class TokenInfoServiceController {
  constructor(private readonly tokenInfoServiceService: TokenInfoServiceService) {}

  @Get()
  getHello(): string {
    return this.tokenInfoServiceService.getHello();
  }
}
