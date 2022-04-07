/// <reference types="multer" />
import { UsersRepository } from 'src/users/users.repository';
import { HttpService } from '@nestjs/axios';
import { AwsService } from 'src/aws.service';
import { Model } from 'mongoose';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { AuthService } from '../auth/auth.service';
import { UserRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';
import { User } from './users.schema';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    private readonly usersRepository;
    private readonly awsService;
    private httpService;
    private readonly userModel;
    constructor(usersService: UsersService, authService: AuthService, usersRepository: UsersRepository, awsService: AwsService, httpService: HttpService, userModel: Model<User>);
    auth(req: any): {
        isLogin: boolean;
        userInfo: any;
        token: any;
    };
    oauth(req: any, body: any): Promise<{
        isLogin: boolean;
        userInfo: User & {
            _id: any;
        };
        token: any;
    }>;
    naverlogin(query: any): Promise<{
        token: any;
        oauthId: any;
    }>;
    kakaoLogin(query: any): Promise<{
        token: any;
        oauthId: any;
    }>;
    googleLogin(query: any): Promise<{
        token: any;
        oauthId: any;
    }>;
    login(body: LoginRequestDto): Promise<{
        isLogin: boolean;
        userInfo: User;
        token: string;
    }>;
    signup(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
        posts: import("../posts/posts.schema").Post[];
        refreshToken: string;
        oauthId: string;
    }>;
    logout(req: any, res: any): any;
    signout(req: any): Promise<string>;
    updateUser(body: any): Promise<User & {
        _id: any;
    }>;
    updateStacks(param: any, body: any): Promise<User & {
        _id: any;
    }>;
    verifyEmail(body: any): Promise<{
        message: string;
    }>;
    verifyUsername(body: any): Promise<{
        message: string;
    }>;
    getUsersPosts(req: any): Promise<User & {
        _id: any;
    }>;
    uploadImage(file: Express.Multer.File, param: any): Promise<User & {
        _id: any;
    }>;
    sendPhoneMessage(body: any): number;
    usersPayment(body: any): Promise<User & {
        _id: any;
    }>;
}
