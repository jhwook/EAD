import { Injectable, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async jwtLogIn(data) {
    const { email, password } = data;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new HttpException('please check your email or password', 401);
    }

    // const isMatch = await bcrypt.compare(password, hashedPassword);
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValidated) {
      throw new HttpException('please check your email or password', 401);
    }

    const payload = { email, sub: user.id };

    return {
      isLogin: true,
      userInfo: user,
      token: this.jwtService.sign(payload),
    };
  }

  // eslint-disable-next-line camelcase
  async validateUser(id: any, name, refreshToken, provider): Promise<any> {
    const username = Math.random().toString(36).substr(2, 11);
    const oauthId = `${id}/${name}/${provider}`; // oauth 유저의 고유한 값
    // DB에서 oauth 유저 정보 찾기
    const user = await this.usersService.findOauthUser(oauthId);
    let newUser;

    // DB에 oauth 유저 정보 없을 시 생성
    if (!user) {
      newUser = this.usersService.oauthSignUp(username, oauthId, refreshToken);
    } else {
      newUser = this.usersService.oauthTokenUpdate(oauthId, refreshToken);
    }
    return newUser;
  }

  onceToken(userProfile: any) {
    const payload = {
      user_email: userProfile.user_email,
      user_nick: userProfile.user_nick,
      user_provider: userProfile.user_provider,
      user_token: 'onceToken',
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '10m',
    });

    return token;
  }

  async createLoginToken(user) {
    const payload = {
      user_no: user.user_no,
      user_token: 'loginToken',
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '6m',
    });

    return token;
  }
}
