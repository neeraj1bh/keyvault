import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import * as url from 'url';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async forwardRequest(req, body) {
    const baseUrl = this.configService.get<string>('KEY_MICROSERVICE_URL');
    const requestUrl = url.resolve(baseUrl, req.url);
    const method = req.method;

    console.log(`Forwarding request to ${requestUrl} with method ${method}`);

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
}
