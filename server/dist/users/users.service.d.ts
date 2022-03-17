import { Model } from 'mongoose';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    signup(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
    }>;
}
