import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
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
    return req.user.readOnlyData;
  }

  @Post('/login')
  async login(@Body() body: LoginRequestDto) {
    return this.authService.jwtLogIn(body);
  }

  @Post('/signup')
  async signup(@Body() body: UserRequestDto) {
    const signupService = await this.usersService.createUser(body);
    return signupService;
  }

  // eslint-disable-next-line class-methods-use-this
  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  logout(@Req() req, @Res() res) {
    res.cookie('jwt', '', {
      maxAge: 0,
    });
    return res.send({
      message: 'success',
    });
  }

  // eslint-disable-next-line class-methods-use-this
  @UseGuards(JwtAuthGuard)
  @Delete('/signout')
  signout(@Req() req) {
    return this.usersService.deleteUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/profile')
  updateUser(@Req() req) {
    return this.usersService.updateUser(req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/stacks/:id')
  updateStacks(@Param() param, @Req() req) {
    return this.usersService.changeStacksBoolean(param, req);
  }

  @Post('/verify/email')
  verifyEmail(@Body() body) {
    return this.usersService.verifyUserEmail(body);
  }

  @Post('/verify/username')
  verifyUsername(@Body() body) {
    return this.usersService.verifyUsername(body);
  }
}
