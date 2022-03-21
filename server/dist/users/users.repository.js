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
exports.UsersRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const users_schema_1 = require("./users.schema");
let UsersRepository = class UsersRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async existsByEmail(email) {
        const result = await this.userModel.exists({ email });
        return result;
    }
    async existsByUsername(username) {
        const result = await this.userModel.exists({ username });
        return result;
    }
    async findUserByIdWithoutPassword(userId) {
        const user = await this.userModel.findById(userId).select('-password');
        return user;
    }
    async findUserByEmail(email) {
        const user = await this.userModel.findOne({ email });
        return user;
    }
    async findUserByUsername(username) {
        const user = await this.userModel.findOne({ username });
        return user;
    }
    async create(user) {
        return await this.userModel.create(user);
    }
    async delete(user) {
        return await this.userModel.deleteOne(user);
    }
    async changeStacks(id, newStacks) {
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
            throw new common_1.HttpException('이미 존재하는 닉네임입니다.', 400);
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
    async findByIdAndUpdateImg(id, fileName) {
        const user = await this.userModel.findById(id);
        user.imgUrl = `http://localhost:4000/media/${fileName}`;
        const newUser = await user.save();
        console.log(newUser);
        return newUser.readOnlyData;
    }
};
UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map