/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
/* eslint-disable no-return-await */
/* eslint-disable lines-between-class-members */
import { UsersRepository } from 'src/users/users.repository';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
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
import { HttpService } from '@nestjs/axios';
import LocalStorage from 'node-localstorage';
import axios from 'axios';
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
    private readonly usersRepository: UsersRepository,
    private httpService: HttpService,
  ) {}

  //  @Get('/all')
  //  getAll() {

  //  }
  // eslint-disable-next-line class-methods-use-this
  @UseGuards(JwtAuthGuard)
  @Get('/auth')
  auth(@Req() req) {
    const token = req.rawHeaders[1].slice(7);

    return { isLogin: true, userInfo: req.user, token };
  }

  // @UseGuards(JwtAuthGuard)
  @Get('/oauth')
  async oauth(@Req() req) {
    const refreshToken = req.rawHeaders[9];

    const user = await this.usersRepository.findByToken(refreshToken);

    return { isLogin: true, userInfo: user, token: refreshToken };
  }

  // Naver 로그인
  @Get('auth/naver')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async naverlogin(@Query() query) {
    const provider = 'naver';
    const { code, state } = query;
    const naverUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}&state=${state}`;
    const naverToken = await axios.get(naverUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    const accessToken = naverToken.data.access_token;
    const refreshToken = naverToken.data.refresh_token;

    const userData = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    await this.authService.validateUser(
      userData.data.response.nickname,
      refreshToken,
      provider,
    );

    return refreshToken;
  }

  // Kakao 로그인
  @Get('auth/kakao')
  async kakaoLogin(@Query() query) {
    const provider = 'kakao';
    const { code } = query;
    const kakaoUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_CALLBACK_URL}&code=${code}`;

    const kakaoToken = await axios.post(kakaoUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    });

    const accessToken = kakaoToken.data.access_token;
    const refreshToken = kakaoToken.data.refresh_token;

    const userData = await axios.get('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    await this.authService.validateUser(
      userData.data.id,
      refreshToken,
      provider,
    );

    return refreshToken;
  }
  // Google 로그인
  @Get('auth/google')
  async googleLogin(@Query() query) {
    const provider = 'google';
    const { code } = query;

    const googleUrl = `https://oauth2.googleapis.com/token?grant_type=authorization_code&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_PASSWORD}&redirect_uri=${process.env.GOOGLE_CALLBACK_URL}&code=${code}`;
    const googleToken = await axios.post(googleUrl, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      withCredentials: true,
    });

    const { access_token, id_token } = googleToken.data;
    // console.log(access_token);
    // console.log(refresh_token);
    // console.log(id_token);
    const userData = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${id_token}`,
    );
    const { iat } = userData.data;

    await this.authService.validateUser(iat, access_token, provider);

    return access_token;
  }
  // @UseGuards(NaverAuthGuard)
  // @Get('auth/naver/callback')
  // async callback(@Req() req, @Res() res: Response): Promise<any> {
  //   if (req.user.type === 'login') {
  //     res.cookie('access_token', req.user.token);
  //   } else {
  //     res.cookie('once_token', req.user.token);
  //   }
  //   res.redirect('http://localhost:3000');

  //   res.end();
  //   // 리다이렉트 해주는 페이지
  // }

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

  @UseGuards(JwtAuthGuard)
  @Post('/payment')
  usersPayment(@Req() req, @Body() body) {
    return this.usersService.usersPayment(req, body);
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
