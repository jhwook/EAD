import { UsersRepository } from './users.repository';
import { UserRequestDto } from './dto/users.request.dto';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    signup(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
    }>;
}
