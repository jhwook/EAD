import { Model } from 'mongoose';
import { TwilioClient } from 'nestjs-twilio';
import { Post } from 'src/posts/posts.schema';
import { Comment } from 'src/posts/comments.schema';
import { User } from './users.schema';
import { UserRequestDto } from './dto/users.request.dto';
export declare class UsersService {
<<<<<<< Updated upstream
=======
    private readonly usersRepository;
    private readonly awsService;
>>>>>>> Stashed changes
    private readonly twilio;
    private readonly userModel;
    private readonly postModel;
    private readonly commentModel;
<<<<<<< Updated upstream
    constructor(twilio: TwilioClient, userModel: Model<User>, postModel: Model<Post>, commentModel: Model<Comment>);
=======
    constructor(usersRepository: UsersRepository, awsService: AwsService, twilio: TwilioClient, userModel: Model<User>, postModel: Model<Post>, commentModel: Model<Comment>);
>>>>>>> Stashed changes
    createUser(body: UserRequestDto): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
        posts: Post[];
        refreshToken: string;
        oauthId: string;
    }>;
    oauthSignUp(username: any, oauthId: any, refreshToken: any): Promise<User & {
        _id: any;
    }>;
    findUserByToken(refreshToken: any): Promise<User & {
        _id: any;
    }>;
    oauthTokenUpdate(oauthId: any, refreshToken: any): Promise<User & {
        _id: any;
    }>;
    deleteUser(userInfo: UserRequestDto): Promise<string>;
    findOauthUser(oauthId: any): Promise<User & {
        _id: any;
    }>;
    updateUser(body: any): Promise<User & {
        _id: any;
    }>;
    changeStacksBoolean(param: any, body: any): Promise<User & {
        _id: any;
    }>;
    verifyUserEmail(body: any): Promise<{
        message: string;
    }>;
    verifyUsername(body: any): Promise<{
        message: string;
    }>;
    sendPhoneMessage(body: any): number;
    usersPayment(body: any): Promise<User & {
        _id: any;
    }>;
}
