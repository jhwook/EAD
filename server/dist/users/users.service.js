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
const nestjs_twilio_1 = require("nestjs-twilio");
const posts_schema_1 = require("../posts/posts.schema");
const comments_schema_1 = require("../posts/comments.schema");
const users_schema_1 = require("./users.schema");
let UsersService = class UsersService {
<<<<<<< Updated upstream
    constructor(twilio, userModel, postModel, commentModel) {
=======
    constructor(usersRepository, awsService, twilio, userModel, postModel, commentModel) {
        this.usersRepository = usersRepository;
        this.awsService = awsService;
>>>>>>> Stashed changes
        this.twilio = twilio;
        this.userModel = userModel;
        this.postModel = postModel;
        this.commentModel = commentModel;
    }
    async createUser(body) {
        const { email, username, password } = body;
        const isEmailExist = await this.userModel.exists({ email });
        const isUsernameExist = await this.userModel.exists({ username });
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
        const user = await this.userModel.create({
            email,
            username,
            password: hashedPassword,
            stacks,
            oauth: false,
        });
        return user.readOnlyData;
    }
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
    async oauthTokenUpdate(oauthId, refreshToken) {
        await this.userModel.findOneAndUpdate({ oauthId }, { refreshToken });
        const updatedUser = await this.userModel.findOne({ oauthId });
        return updatedUser;
    }
    async deleteUser(userInfo) {
        await this.userModel.deleteOne(userInfo);
        return 'successfully signout';
    }
    async findOauthUser(oauthId) {
        return await this.userModel.findOne({ oauthId });
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
        if (newUsername) {
            await this.postModel.updateMany({ writer: id }, { $set: { writerName: newUsername } });
            await this.commentModel.updateMany({ writer: id }, { $set: { writerName: newUsername } });
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
        const modifiedUser = await this.userModel.findById(id);
        return modifiedUser;
    }
    async verifyUserEmail(body) {
        const { email } = body;
        const isExistEmail = await this.userModel.exists({ email });
        if (isExistEmail) {
            throw new common_1.HttpException('존재하는 이메일입니다.', 400);
        }
        else {
            return { message: 'ok' };
        }
    }
    async verifyUsername(body) {
        const { username } = body;
        const isExistUsername = await this.userModel.exists({ username });
        if (isExistUsername) {
            throw new common_1.HttpException('존재하는 닉네임입니다.', 400);
        }
        else {
            return { message: 'ok' };
        }
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
<<<<<<< Updated upstream
    __param(0, (0, nestjs_twilio_1.InjectTwilio)()),
    __param(1, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __param(2, (0, mongoose_2.InjectModel)(posts_schema_1.Post.name)),
    __param(3, (0, mongoose_2.InjectModel)(comments_schema_1.Comment.name)),
    __metadata("design:paramtypes", [Object, mongoose_1.Model,
=======
    __param(2, (0, nestjs_twilio_1.InjectTwilio)()),
    __param(3, (0, mongoose_2.InjectModel)(users_schema_1.User.name)),
    __param(4, (0, mongoose_2.InjectModel)(posts_schema_1.Post.name)),
    __param(5, (0, mongoose_2.InjectModel)(comments_schema_1.Comment.name)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        aws_service_1.AwsService, Object, mongoose_1.Model,
>>>>>>> Stashed changes
        mongoose_1.Model,
        mongoose_1.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map