import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/users.repository';
import { LoginRequestDto } from './dto/login.request.dto';
export declare class AuthService {
    private readonly usersRepository;
    private jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    jwtLogIn(data: LoginRequestDto): Promise<{
        token: string;
    }>;
}
