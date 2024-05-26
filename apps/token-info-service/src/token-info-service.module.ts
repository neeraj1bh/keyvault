import { Module } from '@nestjs/common';
import { TokenInfoController } from './token-info-service.controller';
import { TokenInfoService } from './token-info-service.service';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@app/db';
import { Key } from '@app/db/entities';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { RateLimitGuard } from './guards/rate-limit.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/apps/token-info-service/.env`,
    }),
    DbModule.forRoot(),
    TypeOrmModule.forFeature([Key]),
    ThrottlerModule.forRoot(),
  ],
  controllers: [TokenInfoController],
  providers: [
    TokenInfoService,
    {
      provide: APP_GUARD,
      useClass: RateLimitGuard,
    },
  ],
})
export class TokenInfoServiceModule {}
