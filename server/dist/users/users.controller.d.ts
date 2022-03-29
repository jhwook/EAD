/// <reference types="multer" />
import { Response } from 'express';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { AuthService } from '../auth/auth.service';
import { UserRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    auth(req: any): {
        isLogin: boolean;
        userInfo: any;
        token: any;
    };
    naverlogin(): Promise<void>;
    callback(req: any, res: Response): Promise<any>;
    login(body: LoginRequestDto): Promise<{
        isLogin: boolean;
        userInfo: import("./users.schema").User;
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
    }>;
    logout(req: any, res: any): any;
    signout(req: any): Promise<string>;
    updateUser(req: any): Promise<{
        isLogin: boolean;
        userInfo: import("./users.schema").User & {
            _id: any;
        };
    }>;
    updateStacks(param: any, req: any): Promise<{
        message: string;
    }>;
    verifyEmail(body: any): Promise<{
        message: string;
    }>;
    verifyUsername(body: any): Promise<{
        message: string;
    }>;
    getUsersPosts(req: any): Promise<import("./users.schema").User & {
        _id: any;
    }>;
    uploadImage(files: Array<Express.Multer.File>, req: any): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
        posts: import("../posts/posts.schema").Post[];
    }>;
    sendEmail(body: any): Promise<void>;
    sendPhoneMessage(body: any): number;
    usersPayment(req: any, body: any): Promise<import("./users.schema").User & {
        _id: any;
    }>;
}
