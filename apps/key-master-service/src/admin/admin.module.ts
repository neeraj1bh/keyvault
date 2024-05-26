import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Key } from '@app/db/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Key])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
