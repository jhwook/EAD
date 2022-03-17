import { InjectModel } from '@nestjs/mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';

@Injectable()
export class UsersRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async existsByEmail(email: string) {
    const result = await this.userModel.exists({ email });
    return result;
  }

  async existsByUsername(username: string) {
    const result = await this.userModel.exists({ username });
    return result;
  }

  async findUserByIdWithoutPassword(userId: string): Promise<User | null> {
    const user = await this.userModel.findById(userId).select('-password'); // select('email username')
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async create(user: UserRequestDto) {
    // eslint-disable-next-line no-return-await
    return await this.userModel.create(user);
  }

  async delete(user: UserRequestDto) {
    // eslint-disable-next-line no-return-await
    return await this.userModel.deleteOne(user);
  }

  async findUserAndUpdate(user, body) {
    const { id } = user;
    const {
      password: newPassowrd,
      stacks: newStacks,
      username: newUsername,
    } = body;
    console.log(newUsername);
    const isUsernameExist = await this.userModel.findOne({ newUsername });
    if (!isUsernameExist) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassowrd, salt);

      await this.userModel.findByIdAndUpdate(id, {
        username: newUsername,
        password: hashedPassword,
        stacks: newStacks,
      });
    }
    if (isUsernameExist) {
      throw new HttpException('this username already exists', 400);
    }

    return 'ok';
  }
}
