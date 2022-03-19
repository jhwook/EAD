import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { LoginRequestDto } from './dto/login.request.dto';

@Injectable()
export class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
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
      userInfo: user,
      token: this.jwtService.sign(payload),
    };
  }
}
