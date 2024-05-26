import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements ExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = HttpStatus.TOO_MANY_REQUESTS;

    response.status(status).json({
      statusCode: status,
      error: 'Too Many Requests',
      message: exception.message || 'You have exceeded the rate limit',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
