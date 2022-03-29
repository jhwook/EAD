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
const mailer_1 = require("@nestjs-modules/mailer");
const platform_express_1 = require("@nestjs/platform-express");
const posts_schema_1 = require("../posts/posts.schema");
const comments_schema_1 = require("../posts/comments.schema");
const nestjs_twilio_1 = require("nestjs-twilio");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("../auth/auth.module");
const users_repository_1 = require("./users.repository");
const users_schema_1 = require("./users.schema");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
const axios_1 = require("@nestjs/axios");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                dest: './upload',
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: users_schema_1.User.name, schema: users_schema_1.UserSchema },
                { name: posts_schema_1.Post.name, schema: posts_schema_1.PostSchema },
                { name: comments_schema_1.Comment.name, schema: comments_schema_1.CommentSchema },
            ]),
            mailer_1.MailerModule.forRoot({
                transport: {
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    auth: {
                        type: 'OAuth2',
                        user: process.env.EMAIL_ID,
                        pass: process.env.EMAIL_PASS,
                        clientId: process.env.OAUTH_CLIENT_ID,
                        clientSecret: process.env.OAUTH_CLIENT_SECRET,
                        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
                    },
                },
            }),
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
        providers: [users_service_1.UsersService, users_repository_1.UsersRepository],
        exports: [users_service_1.UsersService, users_repository_1.UsersRepository],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map