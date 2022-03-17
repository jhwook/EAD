import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';

@Injectable()
export class UsersService {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly usersRepository: UsersRepository) {}

  // 회원가입
  async signup(body: UserRequestDto) {
    const { email, username, password } = body;
    const isEmailExist = await this.usersRepository.existsByEmail(email);
    const isUsernameExist = await this.usersRepository.existsByUsername(
      username,
    );

    if (isEmailExist || isUsernameExist) {
      if (isEmailExist) {
        throw new HttpException('this email already exist', 400);
      }
      if (isUsernameExist) {
        throw new HttpException('this username already exist', 400);
      }
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }
}
