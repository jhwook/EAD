import { MailerService } from '@nestjs-modules/mailer';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';
export declare class UsersService {
    private readonly usersRepository;
    private readonly mailerService;
    constructor(usersRepository: UsersRepository, mailerService: MailerService);
    createUser(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: any;
        oauth: any;
    }>;
    deleteUser(userInfo: UserRequestDto): Promise<string>;
    updateUser(req: any): Promise<User & {
        _id: any;
    }>;
    changeStacksBoolean(param: any, req: any): Promise<{
        message: string;
    }>;
    verifyUserEmail(body: any): Promise<{
        message: string;
    }>;
    verifyUsername(body: any): Promise<{
        message: string;
    }>;
    sendEmail(body: any): Promise<void>;
}
