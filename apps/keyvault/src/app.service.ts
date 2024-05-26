import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { resolve } from 'url';
import { AxiosError } from 'axios';
import { ErrorResponseData } from './interfaces/error-response.interface';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async forwardRequest(method, url, body) {
    const baseUrl = this.configService.get<string>('KEY_MICROSERVICE_URL');
    const requestUrl = resolve(baseUrl, url);

    let response;
    switch (method.toLowerCase()) {
      case 'get':
        response = await firstValueFrom(this.httpService.get(requestUrl));
        break;
      case 'delete':
        response = await firstValueFrom(this.httpService.delete(requestUrl));
        break;
      default:
        response = await firstValueFrom(
          this.httpService[method.toLowerCase()](requestUrl, body).pipe(
            catchError((error) => {
              if (error.response) {
                throw new HttpException(
                  {
                    statusCode: error.response.status,
                    error: error.response.data.error,
                    message: error.response.data.message,
                  },
                  error.response.status,
                );
              }
              return throwError(error);
            }),
          ),
        );
        break;
    }

    return response.data;
  }

  async forwardTokenRequest(url) {
    const baseUrl = this.configService.get<string>('TOKEN_MICROSERVICE_URL');
    const requestUrl = `${baseUrl}${url}`;

    const response = await firstValueFrom(
      this.httpService.get(requestUrl).pipe(
        catchError((error: AxiosError) => {
          if (error.response && error.response.status === 429) {
            // Handle ThrottlerException from the remote service
            const data = error.response.data as ErrorResponseData;
            throw new HttpException(
              {
                statusCode: error.response.status,
                error: 'Too Many Requests',
                message: data.message,
                timestamp: new Date().toISOString(),
                path: error.config.url,
              },
              error.response.status,
            );
          }
          // Rethrow other errors
          throw error;
        }),
      ),
    );

    return response.data;
  }
}
