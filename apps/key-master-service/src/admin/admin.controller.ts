import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateKeyDto, UpdateKeyDto } from './dto/admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('key')
  createKey(@Body() createKeyDto: CreateKeyDto) {
    return this.adminService.createKey(createKeyDto);
  }

  @Put('key/:id')
  updateKey(@Param('id') id: number, @Body() updateKeyDto: UpdateKeyDto) {
    return this.adminService.updateKey(id, updateKeyDto);
  }

  @Delete('key/:id')
  deleteKey(@Param('id') id: number) {
    return this.adminService.deleteKey(id);
  }

  @Get('keys')
  listKeys() {
    return this.adminService.listKeys();
  }
}
