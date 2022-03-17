import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { AuthService } from '../auth/auth.service';
import { UserRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    private readonly authService;
    constructor(usersService: UsersService, authService: AuthService);
    auth(req: any): any;
    login(data: LoginRequestDto): Promise<{
        token: string;
    }>;
    signup(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
    }>;
    logout(): string;
    signout(): string;
}
