import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { NONAME } from 'dns';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';

@Injectable()
export class UsersService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
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

  // NAVER 유저 회원가입
  async oauthSignUp(username) {
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
      password: 'None',
      username,
      stacks,
      oauth: false,
    });
  }

  // 회원탈퇴
  async deleteUser(userInfo: UserRequestDto) {
    await this.usersRepository.delete(userInfo);
    return 'successfully signout';
  }

  async findUserByEmail(email) {
    // eslint-disable-next-line no-return-await
    return await this.usersRepository.findUserByEmail(email);
  }

  async findUserByUsername(username) {
    // eslint-disable-next-line no-return-await
    return await this.usersRepository.findUserByUsername(username);
  }

  // 회원정보 수정
  async updateUser(req) {
    const userInfo = req.user;
    // eslint-disable-next-line no-return-await
    return await this.usersRepository.findUserAndUpdate(userInfo, req.body);
  }

  // 스택 버튼 누를 시 수정
  async changeStacksBoolean(param, req) {
    const { id, email } = req.user;
    const user = await this.usersRepository.findUserByEmail(email);
    const idx = param.id;
    const newStacks = user.stacks;
    newStacks.splice(idx, 1, !newStacks[idx]);
    await this.usersRepository.changeStacks(id, newStacks);
    return { message: 'ok' };
  }

  async getAllPosts() {
    const allPost = await this.usersRepository.findAll();
    // console.log(allUser);

    return allPost;
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

  async uploadImg(req, files: Express.Multer.File[]) {
    const { user } = req;
    console.log(`user: ${user}`);
    const fileName = `users/${files[0].filename}`;
    console.log(`fileName: ${fileName}`);
    const newUser = await this.usersRepository.findByIdAndUpdateImg(
      user.id,
      fileName,
    );
    console.log(newUser);
    return newUser;
  }

  async sendEmail(body) {
    const { email } = body;
    console.log(email);
    const number: number = crypto.randomBytes(8).readUInt32LE(0);
    console.log(number);
    await this.mailerService.sendMail({
      to: email, // list of receivers
      from: `${process.env.EMAIL_ID}@naver.com`, // sender address
      subject: 'Testing Nest MailerModule ✔', // Subject line
      text: 'welcome', // plaintext body
      html: `6자리 인증 코드 :  <b> ${number}</b>`, // HTML body content
    });
  }
}
