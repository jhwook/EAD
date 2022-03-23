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
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { NaverAuthGuard } from 'src/auth/naver/naver.guard';
import { Response } from 'express';
import { multerOptions } from '../common/utils/multer.options';
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

  //  @Get('/all')
  //  getAll() {

  //  }
  // eslint-disable-next-line class-methods-use-this
  @UseGuards(JwtAuthGuard)
  @Get('/auth')
  auth(@Req() req) {
    return req.user.readOnlyData;
  }

  // eslint-disable-next-line class-methods-use-this
  @UseGuards(NaverAuthGuard)
  @Get('auth/naver')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async naverlogin(@Req() req) {
    console.log(req.user);
    const { username } = req.user;
    await this.usersService.findUserByUsername(username);
  }

  // eslint-disable-next-line class-methods-use-this
  @UseGuards(NaverAuthGuard)
  @Get('auth/naver/callback')
  async callback(@Req() req, @Res() res: Response): Promise<any> {
    if (req.user.type === 'login') {
      res.cookie('refresh_token', req.user.token);
    } else {
      res.cookie('once_token', req.user.token);
    }
    res.redirect('http://localhost:3000/');
    res.end();
    // 리다이렉트 해주는 페이지
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

  @UseGuards(JwtAuthGuard)
  @Get('posts')
  getUsersPosts(@Req() req) {
    return this.usersService.getUsersPosts(req);
  }

  // eslint-disable-next-line class-methods-use-this

  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('users')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadImage(@UploadedFiles() files: Array<Express.Multer.File>, @Req() req) {
    // return { image: `http://localhost:4000/media/users/${files[0].filename}` };
    return this.usersService.uploadImg(req, files);
  }

  @Post('/send-email')
  sendEmail(@Body() body) {
    return this.usersService.sendEmail(body);
  }

  @Post('/sms')
  sendPhoneMessage(@Body() body) {
    return this.usersService.sendPhoneMessage(body);
  }

  // @Post('/find/email')
  // findEmail(@Body() body) {
  //   return this.usersService.findEmail(body);
  // }

  // @Post('/find/password')
  // findPassword(@Body() body) {
  //   return this.usersService.findPassword(body);
  // }
}
