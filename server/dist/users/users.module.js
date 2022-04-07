"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_schema_1 = require("../posts/posts.schema");
const comments_schema_1 = require("../posts/comments.schema");
const nestjs_twilio_1 = require("nestjs-twilio");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const aws_service_1 = require("../aws.service");
const auth_module_1 = require("../auth/auth.module");
const users_schema_1 = require("./users.schema");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
                { name: posts_schema_1.Post.name, schema: posts_schema_1.PostSchema },
                { name: comments_schema_1.Comment.name, schema: comments_schema_1.CommentSchema },
            ]),
            nestjs_twilio_1.TwilioModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (cfg) => ({
                    accountSid: cfg.get('TWILIO_ACCOUNT_SID'),
                    authToken: cfg.get('TWILIO_AUTH_TOKEN'),
                }),
                inject: [config_1.ConfigService],
            }),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            axios_1.HttpModule,
        ],
        controllers: [users_controller_1.UsersController],
        providers: [users_service_1.UsersService, aws_service_1.AwsService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map