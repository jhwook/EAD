/// <reference types="multer" />
import { UsersRepository } from 'src/users/users.repository';
import { PostsRepository } from './posts.repository';
export declare class PostsService {
    private readonly postsRepository;
    private readonly usersRepository;
    constructor(postsRepository: PostsRepository, usersRepository: UsersRepository);
    getOnePost(id: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    createPost(req: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    updatePost(req: any, param: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    deletePost(param: any): Promise<void>;
    uploadPostImg(req: any, param: any, files: Express.Multer.File[]): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    searchPost(keyword: any): Promise<{
        id: any;
        title: any;
        tag: any;
    }[]>;
    searchPostByTag(body: any): Promise<any[]>;
    createComment(req: any, param: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    modifyComment(req: any, param: any): Promise<import("./comments.schema").Comment & {
        _id: any;
    }>;
    deleteComment(param: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    uploadCommentImg(req: any, param: any, files: Express.Multer.File[]): Promise<import("./comments.schema").Comment & {
        _id: any;
    }>;
    getPostTitle(): Promise<{
        id: any;
        title: string;
        tag: string[];
    }[]>;
}
