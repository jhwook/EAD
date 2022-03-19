import { UsersRepository } from './users.repository';
import { UserRequestDto } from './dto/users.request.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    createUser(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: any;
        oauth: any;
    }>;
    deleteUser(userInfo: UserRequestDto): Promise<string>;
    updateUser(req: any): Promise<void>;
    changeStacksBoolean(param: any, req: any): Promise<{
        message: string;
    }>;
}
