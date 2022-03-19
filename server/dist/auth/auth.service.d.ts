import { User } from 'src/users/users.schema';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
export declare class AuthService {
    private readonly usersRepository;
    private jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    jwtLogIn(data: any): Promise<{
        userInfo: User;
        token: string;
    }>;
}
