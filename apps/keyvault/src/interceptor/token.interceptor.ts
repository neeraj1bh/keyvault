import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  constructor(private httpService: HttpService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const key = ctx.getRequest().headers['x-api-key'];
    const auth = ctx.getRequest().headers['authorization'];

    if (key) {
      this.httpService.axiosRef.defaults.headers.common['x-api-key'] = key;
    }

    if (auth) {
      this.httpService.axiosRef.defaults.headers.common['authorization'] = auth;
    }

    return next.handle().pipe();
  }
}
