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
    }>;
    deleteUser(userInfo: UserRequestDto): Promise<string>;
    updateUser(req: any): Promise<void>;
}
