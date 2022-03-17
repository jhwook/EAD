import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { AuthService } from '../auth/auth.service';
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
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  @UseGuards(JwtAuthGuard)
  @Get('/auth')
  auth(@Req() req) {
    // error 처리
    // throw new HttpException('not authorized', 401);

    return req.user.readOnlyData;
  }

  @Post('/login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @Post('/signup')
  async signup(@Body() body: UserRequestDto) {
    const signupService = await this.usersService.signup(body);
    return signupService;
  }

  // eslint-disable-next-line class-methods-use-this
  @Post('/logout')
  logout() {
    return 'logout';
  }

  // eslint-disable-next-line class-methods-use-this
  @Delete('/signout')
  signout() {
    return 'signout';
  }
}
