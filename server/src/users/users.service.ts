/* eslint-disable no-useless-constructor */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable no-return-await */
/* eslint-disable lines-between-class-members */
import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { Post } from 'src/posts/posts.schema';
import { Comment } from 'src/posts/comments.schema';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectTwilio() private readonly twilio: TwilioClient,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  // 회원가입
  async createUser(body: UserRequestDto) {
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
    const stacks = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];

    const user = await this.userModel.create({
      email,
      username,
      password: hashedPassword,
      stacks,
      oauth: false,
    });

    return user.readOnlyData;
  }

  // Oauth 유저 회원가입
  async oauthSignUp(username, oauthId, refreshToken) {
    const stacks = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];
    await this.userModel.create({
      email: 'None',
      oauthId,
      username,
      stacks,
      oauth: true,
      refreshToken,
      password: 'None',
    });

    const createdUser = await this.userModel.findOne({ oauthId });
    return createdUser;
  }
  async findUserByToken(refreshToken) {
    const user = this.userModel.findOne({ refreshToken });
    return user;
  }

  // oauth 유저 토큰 업데이트
  async oauthTokenUpdate(oauthId, refreshToken) {
    await this.userModel.findOneAndUpdate({ oauthId }, { refreshToken });
    const updatedUser = await this.userModel.findOne({ oauthId });
    return updatedUser;
  }

  // 회원탈퇴
  async deleteUser(userInfo: UserRequestDto) {
    await this.userModel.deleteOne(userInfo);
    return 'successfully signout';
  }

  // oauth 유저 찾기
  async findOauthUser(oauthId) {
    return await this.userModel.findOne({ oauthId });
  }

  // 회원정보 수정
  async updateUser(body) {
    const { id, newUsername, newPassword } = body;

    if (!newPassword || newPassword === '') {
      await this.userModel.findByIdAndUpdate(id, { username: newUsername });
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      await this.userModel.findByIdAndUpdate(id, {
        username: newUsername,
        password: hashedPassword,
      });
    }

    // 유저의 포스트, 댓글 닉네임 수정
    if (newUsername) {
      await this.postModel.updateMany(
        { writer: id },
        { $set: { writerName: newUsername } },
      );
      await this.commentModel.updateMany(
        { writer: id },
        { $set: { writerName: newUsername } },
      );
    }

    const modifiedUser = await this.userModel.findById(id);
    return modifiedUser;
  }

  // 스택 버튼 누를 시 수정
  async changeStacksBoolean(param, body) {
    const { id } = body;
    const user = await this.userModel.findById(id);
    const idx = param.id;
    const newStacks = user.stacks;
    newStacks.splice(idx, 1, !newStacks[idx]);
    await this.userModel.findByIdAndUpdate(id, { stacks: newStacks });

    const modifiedUser = await this.userModel.findById(id);
    return modifiedUser;
  }

  // email 유효성 검사
  async verifyUserEmail(body) {
    const { email } = body;
    const isExistEmail = await this.userModel.exists({ email });
    if (isExistEmail) {
      throw new HttpException('존재하는 이메일입니다.', 400);
    } else {
      return { message: 'ok' };
    }
  }

  // username 유효성 검사
  async verifyUsername(body) {
    const { username } = body;
    const isExistUsername = await this.userModel.exists({ username });
    if (isExistUsername) {
      throw new HttpException('존재하는 닉네임입니다.', 400);
    } else {
      return { message: 'ok' };
    }
  }

  // 문자 인증
  sendPhoneMessage(body) {
    const randomNumber = Math.floor(Math.random() * 1000000) + 1;
    const { phone } = body;

    this.twilio.messages.create({
      body: `SMS 인증 테스트 인증번호 [${randomNumber}]를 입력해주세요`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
    return randomNumber;
  }

  // 유저 금액 충전
  async usersPayment(body) {
    const { id, cost } = body;

    const user = await this.userModel.findById(id);

    await this.userModel.findByIdAndUpdate(id, {
      money: user.money + Number(cost),
    });
    const userinfo = await this.userModel.findById(id);

    return userinfo;
  }
}
