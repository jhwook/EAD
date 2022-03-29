import { Injectable, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.schema';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private usersService: UsersService,
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data) {
    const { email, password } = data;

    const user = await this.usersRepository.findUserByEmail(email);

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
  async validateUser(userData: any, refreshToken, provider): Promise<any> {
    const username = `${userData}/${provider}`;
    // DB에서 oauth 유저 정보 찾기
    const user = await this.usersService.findUserByUsername(username);
    // console.log(user);
    // DB에 oauth 유저 정보 없을 시 생성
    if (!user) {
      this.usersService.oauthSignUp(username, refreshToken);
    } else {
      this.usersService.oauthTokenUpdate(user, refreshToken);
    }
    return user;
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

  // async createRefreshToken(user: User) {
  //   const payload = {
  //     user_no: user.user_no,
  //     user_token: 'refreshToken',
  //   };

  //   const token = this.jwtService.sign(payload, {
  //     secret: process.env.JWT_SECRET,
  //     expiresIn: '50m',
  //   });

  //   const refresh_token = CryptoJS.AES.encrypt(
  //     JSON.stringify(token),
  //     process.env.AES_KEY,
  //   ).toString();

  //   await getConnection()
  //     .createQueryBuilder()
  //     .update(User)
  //     .set({ user_refresh_token: token })
  //     .where(`user_no = ${user.user_no}`)
  //     .execute();
  //   return refresh_token;
  // }
}
