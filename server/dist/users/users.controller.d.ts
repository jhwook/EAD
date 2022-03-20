/// <reference types="multer" />
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { AuthService } from '../auth/auth.service';
import { UserRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';
import { User } from './users.schema';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    auth(req: any): any;
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
    }>;
    logout(req: any, res: any): any;
    signout(req: any): Promise<string>;
    updateUser(req: any): Promise<User & {
        _id: any;
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
    uploadImage(files: Array<Express.Multer.File>, req: any): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
    }>;
    sendEmail(body: any): Promise<void>;
}
