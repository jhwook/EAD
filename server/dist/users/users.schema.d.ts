/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
import { Post } from 'src/posts/posts.schema';
export declare class User extends Document {
    email: string;
    username: string;
    password: string;
    stacks: boolean[];
    oauth: boolean;
    imgUrl: string;
    deposit: number;
    money: number;
    refreshToken: string;
    readonly readOnlyData: {
        id: string;
        email: string;
        username: string;
        stacks: object;
        oauth: any;
        imgUrl: string;
        posts: Post[];
        refreshToken: string;
    };
    readonly posts: Post[];
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any>, any, any>;
