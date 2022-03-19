import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { AuthService } from '../auth/auth.service';
import { UserRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    auth(req: any): any;
    login(body: LoginRequestDto): Promise<{
        isLogin: boolean;
        userInfo: import("./users.schema").User;
        token: string;
    }>;
    signup(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: any;
        oauth: any;
    }>;
    logout(req: any, res: any): any;
    signout(req: any): Promise<string>;
    updateUser(req: any): Promise<void>;
    updateStacks(param: any, req: any): Promise<{
        message: string;
    }>;
    verifyEmail(body: any): Promise<{
        message: string;
    }>;
    verifyUsername(body: any): Promise<{
        message: string;
    }>;
}
