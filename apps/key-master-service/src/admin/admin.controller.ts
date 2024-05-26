import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateKeyDto, UpdateKeyDto } from './dto/admin.dto';
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('key')
  createKey(@Body() createKeyDto: CreateKeyDto) {
    return this.adminService.createKey(createKeyDto);
  }

  @Put('key/:key')
  updateKey(@Param('key') key: string, @Body() updateKeyDto: UpdateKeyDto) {
    return this.adminService.updateKey(key, updateKeyDto);
  }

  @Delete('key/:key')
  deleteKey(@Param('key') key: string) {
    return this.adminService.deleteKey(key);
  }

  @Get('keys')
  listKeys() {
    return this.adminService.listKeys();
  }
}
