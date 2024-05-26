import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@app/auth';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HeadersInterceptor } from './interceptor/token.interceptor';
import { HttpErrorInterceptor } from './interceptor/http-error.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/apps/keyvault/.env`,
    }),
    AuthModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HeadersInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpErrorInterceptor,
    },
  ],
})
export class AppModule {}
