import { Injectable } from '@nestjs/common';

@Injectable()
export class KeyMasterServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
