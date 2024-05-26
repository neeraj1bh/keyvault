import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ThrottlerException } from '@nestjs/throttler';

@Injectable()
export class HttpErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.response) {
          const status =
            error.response.status ||
            error.response.statusCode ||
            HttpStatus.INTERNAL_SERVER_ERROR;
          const message =
            error.response.message ||
            error.message ||
            error.response.data?.message ||
            'Internal server error';
          const errorDetail =
            error.response.data?.error ||
            error.response.error ||
            'Internal server error';

          throw new HttpException(
            {
              statusCode: status,
              error: errorDetail,
              message: message,
              timestamp: new Date().toISOString(),
              path: context.switchToHttp().getRequest().url,
            },
            status,
          );
        } else if (error instanceof ThrottlerException) {
          // Handle ThrottlerException specifically
          const status = HttpStatus.TOO_MANY_REQUESTS;
          const message = 'Too Many Requests';
          return throwError(
            new HttpException(
              {
                statusCode: status,
                error: message,
                message: error.message,
                timestamp: new Date().toISOString(),
                path: context.switchToHttp().getRequest().url,
              },
              status,
            ),
          );
        } else {
          // Handle generic errors
          return throwError(
            new HttpException(
              'Internal server error',
              HttpStatus.INTERNAL_SERVER_ERROR,
            ),
          );
        }
      }),
    );
  }
}
