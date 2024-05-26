import { Module } from '@nestjs/common';
import { KeyMasterServiceController } from './key-master-service.controller';
import { KeyMasterServiceService } from './key-master-service.service';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { DbModule } from '@app/db';
import { Key } from '@app/db/entities';
import { AuthModule } from '@app/auth';
import { LoggerModule } from '@app/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/apps/key-master-service/.env`,
    }),
    AdminModule,
    AuthModule,
    DbModule.forRoot(),
    DbModule.forFeature([Key]),
    UserModule,
    LoggerModule,
  ],
  controllers: [KeyMasterServiceController],
  providers: [KeyMasterServiceService],
})
export class KeyMasterServiceModule {}
