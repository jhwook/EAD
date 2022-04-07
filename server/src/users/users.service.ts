/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable no-return-await */
/* eslint-disable lines-between-class-members */
import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
// import * as twilio from 'twilio';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { Post } from 'src/posts/posts.schema';
import { Comment } from 'src/posts/comments.schema';
import { AwsService } from 'src/aws.service';

import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const twilio = require('twilio')(accountSid, authToken);

@Injectable()
export class UsersService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
    private readonly awsService: AwsService,
    @InjectTwilio() private readonly twilio: TwilioClient,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  // 회원가입
  async createUser(body: UserRequestDto) {
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

    const user = await this.usersRepository.create({
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
    await this.usersRepository.create({
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

  async oauthTokenUpdate(oauthId, refreshToken) {
    // await this.usersRepository.oauthTokenUpdate(user, refreshToken);
    await this.userModel.findOneAndUpdate({ oauthId }, { refreshToken });
    const updatedUser = await this.userModel.findOne({ oauthId });
    return updatedUser;
  }

  // 회원탈퇴
  async deleteUser(userInfo: UserRequestDto) {
    await this.usersRepository.delete(userInfo);
    return 'successfully signout';
  }

  async findUserByEmail(email) {
    return await this.usersRepository.findUserByEmail(email);
  }

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

  async getUsersPosts(req) {
    const { id } = req.user;
    const usersPost = await this.usersRepository.findUserPosts(id);

    return usersPost;
  }

  async verifyUserEmail(body) {
    const { email } = body;
    const isExistEmail = await this.usersRepository.existsByEmail(email);
    if (isExistEmail) {
      throw new HttpException('존재하는 이메일입니다.', 400);
    } else {
      return { message: 'ok' };
    }
  }

  async verifyUsername(body) {
    const { username } = body;
    const isExistUsername = await this.usersRepository.existsByUsername(
      username,
    );
    if (isExistUsername) {
      throw new HttpException('존재하는 닉네임입니다.', 400);
    } else {
      return { message: 'ok' };
    }
  }

  // async sendEmail(body) {
  //   const { email } = body;
  //   const number: number = crypto.randomBytes(8).readUInt32LE(0);

  //   await this.mailerService.sendMail({
  //     to: email, // list of receivers
  //     from: process.env.EMAIL_ID, // sender address
  //     subject: 'Testing Nest MailerModule ✔', // Subject line
  //     text: 'welcome', // plaintext body
  //     html: `6자리 인증 코드 :  <b> ${number}</b>`, // HTML body content
  //   });
  // }

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
    // const userinfo = await this.usersRepository.usersPayment(id, cost);
    const user = await this.userModel.findById(id);

    await this.userModel.findByIdAndUpdate(id, {
      money: user.money + Number(cost),
    });
    const userinfo = await this.userModel.findById(id);

    return userinfo;
  }
}
