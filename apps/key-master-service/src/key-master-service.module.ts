import { Module } from '@nestjs/common';
import { KeyMasterServiceController } from './key-master-service.controller';
import { KeyMasterServiceService } from './key-master-service.service';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { DbModule } from '@app/db';
import { Key } from '@app/db/entities';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/apps/key-master-service/.env`,
    }),
    AdminModule,
    DbModule.forRoot(),
    DbModule.forFeature([Key]),
    UserModule,
  ],
  controllers: [KeyMasterServiceController],
  providers: [KeyMasterServiceService],
})
export class KeyMasterServiceModule {}
