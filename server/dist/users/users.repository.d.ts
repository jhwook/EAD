/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
import { Model } from 'mongoose';
import { UserRequestDto } from './dto/users.request.dto';
import { User } from './users.schema';
export declare class UsersRepository {
    private readonly userModel;
    constructor(userModel: Model<User>);
    existsByEmail(email: string): Promise<Pick<import("mongoose").Document<User, any, any>, "_id">>;
    existsByUsername(username: string): Promise<Pick<import("mongoose").Document<User, any, any>, "_id">>;
    findUserByIdWithoutPassword(userId: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    create(user: UserRequestDto): Promise<User & {
        _id: any;
    }>;
    delete(user: UserRequestDto): Promise<import("mongodb").DeleteResult>;
    findUserAndUpdate(user: any, body: any): Promise<string>;
}
