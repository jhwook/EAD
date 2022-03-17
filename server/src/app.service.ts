import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // eslint-disable-next-line class-methods-use-this
  getHello(): string {
    // console.log(body);
    // console.log(param);
    return 'Hello World!';
  }
}
