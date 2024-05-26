import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { resolve } from 'url';

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
          this.httpService[method.toLowerCase()](requestUrl, body),
        );
        break;
    }

    return response.data;
  }

  async forwardTokenRequest(url) {
    const baseUrl = this.configService.get<string>('TOKEN_MICROSERVICE_URL');
    const requestUrl = `${baseUrl}${url}`;

    const response = await firstValueFrom(this.httpService.get(requestUrl));

    return response.data;
  }
}
