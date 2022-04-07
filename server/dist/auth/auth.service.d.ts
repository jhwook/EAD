import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private usersService;
    private jwtService;
    private readonly userModel;
    constructor(usersService: UsersService, jwtService: JwtService, userModel: Model<User>);
    jwtLogIn(data: any): Promise<{
        isLogin: boolean;
        userInfo: User & {
            _id: any;
        };
        token: string;
    }>;
    validateUser(id: any, name: any, refreshToken: any, provider: any): Promise<any>;
    onceToken(userProfile: any): string;
    createLoginToken(user: any): Promise<string>;
}
