"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mailer_1 = require("@nestjs-modules/mailer");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(usersRepository, mailerService) {
        this.usersRepository = usersRepository;
        this.mailerService = mailerService;
    }
    async createUser(body) {
        const { email, username, password } = body;
        const isEmailExist = await this.usersRepository.existsByEmail(email);
        const isUsernameExist = await this.usersRepository.existsByUsername(username);
        if (isEmailExist || isUsernameExist) {
            if (isEmailExist) {
                throw new common_1.HttpException('this email already exist', 400);
            }
            if (isUsernameExist) {
                throw new common_1.HttpException('this username already exist', 400);
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
    async deleteUser(userInfo) {
        await this.usersRepository.delete(userInfo);
        return 'successfully signout';
    }
    async updateUser(req) {
        const userInfo = req.user;
        return await this.usersRepository.findUserAndUpdate(userInfo, req.body);
    }
    async changeStacksBoolean(param, req) {
        const { id, email } = req.user;
        const user = await this.usersRepository.findUserByEmail(email);
        const idx = param.id;
        const newStacks = user.stacks;
        newStacks.splice(idx, 1, !newStacks[idx]);
        await this.usersRepository.changeStacks(id, newStacks);
        return { message: 'ok' };
    }
    async verifyUserEmail(body) {
        const { email } = body;
        const isExistEmail = await this.usersRepository.existsByEmail(email);
        if (isExistEmail) {
            throw new common_1.HttpException('존재하는 이메일입니다.', 400);
        }
        else {
            return { message: 'ok' };
        }
    }
    async verifyUsername(body) {
        const { username } = body;
        const isExistUsername = await this.usersRepository.existsByUsername(username);
        if (isExistUsername) {
            throw new common_1.HttpException('존재하는 닉네임입니다.', 400);
        }
        else {
            return { message: 'ok' };
        }
    }
    async uploadImg(req, files) {
        const { user } = req;
        console.log(`user: ${user}`);
        const fileName = `users/${files[0].filename}`;
        console.log(`fileName: ${fileName}`);
        const newUser = await this.usersRepository.findByIdAndUpdateImg(user.id, fileName);
        console.log(newUser);
        return newUser;
    }
    async sendEmail(body) {
        const { email } = body;
        console.log(email);
        const number = crypto.randomBytes(8).readUInt32LE(0);
        console.log(number);
        await this.mailerService.sendMail({
            to: email,
            from: `${process.env.EMAIL_ID}@naver.com`,
            subject: 'Testing Nest MailerModule ✔',
            text: 'welcome',
            html: `6자리 인증 코드 :  <b> ${number}</b>`,
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        mailer_1.MailerService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map