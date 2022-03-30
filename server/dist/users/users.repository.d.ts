import mongoose, { Model } from 'mongoose';
import { Post } from 'src/posts/posts.schema';
import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';
export declare class UsersRepository {
    private readonly userModel;
    private readonly postModel;
    constructor(userModel: Model<User>, postModel: Model<Post>);
    findByToken(refreshToken: any): Promise<User & {
        _id: any;
    }>;
    oauthTokenUpdate(user: any, refreshToken: any): Promise<User & {
        _id: any;
    }>;
    existsByEmail(email: string): Promise<Pick<mongoose.Document<User, any, any>, "_id">>;
    existsByUsername(username: string): Promise<Pick<mongoose.Document<User, any, any>, "_id">>;
    findUserByIdWithoutPassword(userId: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserByUsername(username: string): Promise<User | null>;
    create(user: any): Promise<User & {
        _id: any;
    }>;
    delete(user: UserRequestDto): Promise<import("mongodb").DeleteResult>;
    changeStacks(id: any, newStacks: any): Promise<User & {
        _id: any;
    }>;
    findUserPosts(id: any): Promise<User & {
        _id: any;
    }>;
    findByIdAndUpdateImg(id: string, fileName: string): Promise<{
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
        posts: Post[];
        refreshToken: string;
    }>;
}
