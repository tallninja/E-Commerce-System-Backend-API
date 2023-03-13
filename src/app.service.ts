import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { info: 'E-Commerce Backend API' };
  }
}
