import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Key } from '@app/db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Key])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
