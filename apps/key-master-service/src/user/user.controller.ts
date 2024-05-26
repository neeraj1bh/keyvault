import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { QueryKeyDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('key')
  getKeyDetails(@Body() queryKeyDto: QueryKeyDto) {
    return this.userService.getKeyDetails(queryKeyDto.key);
  }

  @Post('key/disable')
  disableKey(@Body() queryKeyDto: QueryKeyDto) {
    return this.userService.disableKey(queryKeyDto.key);
  }
}
