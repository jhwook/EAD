/// <reference types="multer" />
import { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { TwilioClient } from 'nestjs-twilio';
import { Post } from 'src/posts/posts.schema';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';
export declare class UsersService {
    private readonly usersRepository;
    private readonly mailerService;
    private readonly twilio;
    private readonly userModel;
    private readonly postModel;
    constructor(usersRepository: UsersRepository, mailerService: MailerService, twilio: TwilioClient, userModel: Model<User>, postModel: Model<Post>);
    createUser(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
        posts: Post[];
        refreshToken: string;
    }>;
    oauthSignUp(username: any, refreshToken: any): Promise<void>;
    findUserByToken(refreshToken: any): Promise<User & {
        _id: any;
    }>;
    oauthTokenUpdate(user: any, refreshToken: any): Promise<void>;
    deleteUser(userInfo: UserRequestDto): Promise<string>;
    findUserByEmail(email: any): Promise<User>;
    findUserByUsername(username: any): Promise<User>;
    updateUser(body: any): Promise<User & {
        _id: any;
    }>;
    changeStacksBoolean(param: any, body: any): Promise<{
        message: string;
    }>;
    getUsersPosts(req: any): Promise<User & {
        _id: any;
    }>;
    verifyUserEmail(body: any): Promise<{
        message: string;
    }>;
    verifyUsername(body: any): Promise<{
        message: string;
    }>;
    uploadImg(body: any, files: Express.Multer.File[]): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
        posts: Post[];
        refreshToken: string;
    }>;
    sendPhoneMessage(body: any): number;
    usersPayment(body: any): Promise<User & {
        _id: any;
    }>;
}
