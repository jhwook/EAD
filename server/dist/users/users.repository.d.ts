import mongoose, { Model } from 'mongoose';
import { Post } from 'src/posts/posts.schema';
import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';
export declare class UsersRepository {
    private readonly userModel;
    private readonly postModel;
    constructor(userModel: Model<User>, postModel: Model<Post>);
    existsByEmail(email: string): Promise<Pick<mongoose.Document<User, any, any>, "_id">>;
    existsByUsername(username: string): Promise<Pick<mongoose.Document<User, any, any>, "_id">>;
    findUserByIdWithoutPassword(userId: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    create(user: UserRequestDto): Promise<User & {
        _id: any;
    }>;
    delete(user: UserRequestDto): Promise<import("mongodb").DeleteResult>;
    changeStacks(id: any, newStacks: any): Promise<User & {
        _id: any;
    }>;
    findUserAndUpdate(user: any, body: any): Promise<User & {
        _id: any;
    }>;
    findAll(): Promise<Omit<Post & {
        _id: any;
    }, never>[]>;
    findByIdAndUpdateImg(id: string, fileName: string): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
        posts: Post[];
    }>;
}
