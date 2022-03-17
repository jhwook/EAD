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
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async signup(body) {
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
        const user = await this.usersRepository.create({
            email,
            username,
            password: hashedPassword,
        });
        return user.readOnlyData;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map