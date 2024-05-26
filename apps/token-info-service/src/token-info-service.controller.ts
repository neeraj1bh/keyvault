import { Controller, Get } from '@nestjs/common';
import { TokenInfoService } from './token-info-service.service';

@Controller('token')
export class TokenInfoController {
  constructor(private readonly tokenInfoService: TokenInfoService) {}

  @Get()
  getTokenInfo() {
    return this.tokenInfoService.getTokenInfo();
  }
}
