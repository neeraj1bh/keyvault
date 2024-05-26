import {
  All,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';
import { HeadersInterceptor } from './interceptor/token.interceptor';

@Controller()
@UseInterceptors(HeadersInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @All('admin/*')
  @UseGuards(JwtAuthGuard)
  forwardRequest(@Req() req, @Body() body) {
    const method = req.method;
    const url = req.url;

    return this.appService.forwardRequest(method, url, body);
  }

  @Post('user/*')
  forwardUserRequest(@Req() req, @Body() body) {
    const method = req.method;
    const url = req.url;

    return this.appService.forwardRequest(method, url, body);
  }

  @Get('token')
  forwardTokenRequest(@Req() req) {
    const url = req.url;

    return this.appService.forwardTokenRequest(url);
  }
}
