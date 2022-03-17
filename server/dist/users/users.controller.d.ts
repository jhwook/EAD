import { UserRequestDto } from './dto/users.request.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    auth(): string;
    login(param: number): {
        user: string;
    };
    signup(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
    }>;
    logout(): string;
    signout(): string;
}
