import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenInfoServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
