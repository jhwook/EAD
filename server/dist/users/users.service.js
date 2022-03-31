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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const mailer_1 = require("@nestjs-modules/mailer");
const nestjs_twilio_1 = require("nestjs-twilio");
const users_repository_1 = require("./users.repository");
const users_schema_1 = require("./users.schema");
let UsersService = class UsersService {
    constructor(usersRepository, mailerService, twilio, userModel, postModel) {
        this.usersRepository = usersRepository;
        this.mailerService = mailerService;
        this.twilio = twilio;
        this.userModel = userModel;
        this.postModel = postModel;
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
    async oauthSignUp(username, password, refreshToken) {
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
            password,
            username,
            stacks,
            oauth: true,
            refreshToken,
        });
        const createdUser = await this.userModel.findOne({ password });
        return createdUser;
    }
    async findUserByToken(refreshToken) {
        const user = this.userModel.findOne({ refreshToken });
        return user;
    }
    async oauthTokenUpdate(password, refreshToken) {
        await this.userModel.findOneAndUpdate({ password }, { refreshToken });
        const updatedUser = await this.userModel.findOne({ password });
        return updatedUser;
    }
    async deleteUser(userInfo) {
        await this.usersRepository.delete(userInfo);
        return 'successfully signout';
    }
    async findUserByEmail(email) {
        return await this.usersRepository.findUserByEmail(email);
    }
    async findOauthUser(password) {
        return await this.userModel.findOne({ password });
    }
    async updateUser(body) {
        const { id, newUsername, newPassword } = body;
        if (!newPassword || newPassword === '') {
            await this.userModel.findByIdAndUpdate(id, { username: newUsername });
        }
        else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            await this.userModel.findByIdAndUpdate(id, {
                username: newUsername,
                password: hashedPassword,
            });
        }
        const modifiedUser = await this.userModel.findById(id);
        return modifiedUser;
    }
    async changeStacksBoolean(param, body) {
        const { id } = body;
        const user = await this.userModel.findById(id);
        const idx = param.id;
        const newStacks = user.stacks;
        newStacks.splice(idx, 1, !newStacks[idx]);
        await this.userModel.findByIdAndUpdate(id, { stacks: newStacks });
        return { message: 'ok' };
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
    async uploadImg(body, files) {
        const { id } = body;
        const fileName = `users/${files[0].filename}`;
        console.log(`fileName: ${fileName}`);
        const newUser = await this.usersRepository.findByIdAndUpdateImg(id, fileName);
        return newUser;
    }
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
    async usersPayment(body) {
        const { id, cost } = body;
        const user = await this.userModel.findById(id);
        await this.userModel.findByIdAndUpdate(id, {
            money: user.money + Number(cost),
        });
        const userinfo = await this.userModel.findById(id);
        return userinfo;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nestjs_twilio_1.InjectTwilio)()),
    __param(3, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __param(4, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        mailer_1.MailerService, Object, mongoose_1.Model,
        mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map