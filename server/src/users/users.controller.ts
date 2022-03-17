import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UserRequestDto } from './dto/users.request.dto';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  // 의존성 주입
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly usersService: UsersService) {}

  // eslint-disable-next-line class-methods-use-this
  @Get('/auth')
  auth() {
    // error 처리
    throw new HttpException('not authorized', 401);
    return 'auth';
  }

  @Post('/login/:id')
  login(@Param('id', ParseIntPipe) param: number) {
    console.log('hello controller!');
    return { user: 'jhwook' };
  }

  @Post('/signup')
  async signup(@Body() body: UserRequestDto) {
    return await this.usersService.signup(body);
  }

  @Post('/logout')
  logout() {
    return 'logout';
  }

  @Delete('/signout')
  signout() {
    return 'signout';
  }
}
