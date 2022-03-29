import { InjectModel } from '@nestjs/mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { PostSchema, Post } from 'src/posts/posts.schema';
import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';

@Injectable()
export class UsersRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(User.name) private readonly postModel: Model<Post>,
  ) {}

  async findByToken(refreshToken) {
    const user = await this.userModel.findOne({ refreshToken });

    return user;
  }

  async oauthTokenUpdate(user, refreshToken) {
    await this.userModel.findByIdAndUpdate(user.id, { refreshToken });
    const updatedUser = await this.userModel.findById(user.id);
    return updatedUser;
  }

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

  async findUserByUsername(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  async create(user) {
    // eslint-disable-next-line no-return-await
    return await this.userModel.create(user);
  }

  async delete(user: UserRequestDto) {
    // eslint-disable-next-line no-return-await
    return await this.userModel.deleteOne(user);
  }

  async changeStacks(id, newStacks) {
    // eslint-disable-next-line no-return-await
    return await this.userModel.findByIdAndUpdate(id, {
      stacks: newStacks,
    });
  }

  async findUserAndUpdate(user, body) {
    const { id } = user;
    const { username: newUsername, password: newPassword } = body;
    const isExistUsername = await this.userModel.findOne({
      username: newUsername,
    });

    if (isExistUsername) {
      throw new HttpException('이미 존재하는 닉네임입니다.', 400);
    }

    if (!newPassword) {
      await this.userModel.findByIdAndUpdate(id, {
        username: newUsername,
      });
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await this.userModel.findByIdAndUpdate(id, {
        username: newUsername,
        password: hashedPassword,
      });
    }

    const modifiedUserInfo = await this.userModel.findById(id);
    return modifiedUserInfo;
  }

  async findUserPosts(id) {
    const result = await this.userModel.findById(id).populate('posts');

    return result;
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const user = await this.userModel.findById(id);
    user.imgUrl = `http://localhost:4000/media/${fileName}`;
    const newUser = await user.save();
    console.log(newUser);
    return newUser.readOnlyData;
  }

  async usersPayment(id, cost) {
    const user = await this.userModel.findById(id);

    await this.userModel.findByIdAndUpdate(id, {
      money: user.money + Number(cost),
    });
    const userinfo = await this.userModel.findById(id);
    return userinfo;
  }
}
