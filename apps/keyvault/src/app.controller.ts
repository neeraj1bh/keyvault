import {
  All,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @All('admin/*')
  @UseGuards(JwtAuthGuard)
  forwardRequest(@Req() req, @Body() body?) {
    return this.appService.forwardRequest(req, body);
  }

  @Post('user/*')
  forwardUserRequest(@Req() req, @Body() body) {
    return this.appService.forwardRequest(req, body);
  }
}
