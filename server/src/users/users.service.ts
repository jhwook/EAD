import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async signup(body: UserRequestDto) {
    const { email, username, password } = body;
    const isEmailExist = await this.userModel.exists({ email });
    const isUsernameExist = await this.userModel.exists({ username });

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
    // console.log(`salt: ${salt}`);
    // console.log(`hashedPassword: ${hashedPassword}`);
    // const isMatch = await bcrypt.compare(password, hashedPassword);
    // console.log(isMatch);
    const user = await this.userModel.create({
      email,
      username,
      password: hashedPassword,
    });

    return user.readOnlyData;
  }
}
