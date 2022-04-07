"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const mongoose = require("mongoose");
const aws_service_1 = require("./aws.service");
const auth_module_1 = require("./auth/auth.module");
const logger_middleware_1 = require("./common/middlewares/logger.middleware");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const posts_module_1 = require("./posts/posts.module");
const chats_module_1 = require("./chats/chats.module");
let AppModule = class AppModule {
    constructor() {
        this.isDev = process.env.MODE === 'dev';
    }
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
        mongoose.set('debug', this.isDev);
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            posts_module_1.PostsModule,
            chats_module_1.ChatsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, aws_service_1.AwsService],
        exports: [aws_service_1.AwsService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map