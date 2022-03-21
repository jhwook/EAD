/// <reference types="multer" />
import { MailerService } from '@nestjs-modules/mailer';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';
export declare class UsersService {
    private readonly usersRepository;
    private readonly mailerService;
    constructor(usersRepository: UsersRepository, mailerService: MailerService);
    createUser(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
    }>;
    oauthSignUp(username: any): Promise<void>;
    deleteUser(userInfo: UserRequestDto): Promise<string>;
    findUserByEmail(email: any): Promise<User>;
    findUserByUsername(username: any): Promise<User>;
    updateUser(req: any): Promise<User & {
        _id: any;
    }>;
    changeStacksBoolean(param: any, req: any): Promise<{
        message: string;
    }>;
    verifyUserEmail(body: any): Promise<{
        message: string;
    }>;
    verifyUsername(body: any): Promise<{
        message: string;
    }>;
    uploadImg(req: any, files: Express.Multer.File[]): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
    }>;
    sendEmail(body: any): Promise<void>;
}
