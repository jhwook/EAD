import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    // eslint-disable-next-line no-underscore-dangle
    const userEmail = profile._json.email;
    // eslint-disable-next-line no-underscore-dangle
    const userNick = profile._json.nickname;
    const userProvider = profile.provider;
    const userProfile = {
      userEmail,
      userNick,
      userProvider,
    };
    console.log(userProfile.userNick);
    const username = `${userProfile.userNick}/${userProfile.userProvider}`;
    console.log(username);
    const user = await this.authService.validateUser(username);
    if (user === null) {
      // 유저가 없을때
      console.log('일회용 토큰 발급');
      console.log(
        `userProfile: ${userProfile.userEmail} ${userProfile.userNick} ${userProfile.userProvider}`,
      );
      const once_token = this.authService.onceToken(userProfile);
      console.log(`once_token: ${once_token}`);
      const oauthUser = await this.authService.createOauthUser(username);
      // eslint-disable-next-line camelcase
      return {
        isLogin: true,
        userInfo: oauthUser,
        token: once_token,
        type: 'once',
      };
    }

    // 유저가 있을때
    console.log('로그인 토큰 발급');
    const access_token = await this.authService.createLoginToken(user);
    // const refresh_token = await this.authService.createRefreshToken(user);
    return {
      isLogin: true,
      userInfo: user,
      token: access_token,
      type: 'login',
    };
  }

  // const user = await this.authService.validateUser(userEmail);
  // if (user === null) {
  //   return fail;
  // }

  // return done(null, user);
  // }
}
