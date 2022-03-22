/// <reference types="multer" />
import { PostsRepository } from './posts.repository';
export declare class PostsService {
    private readonly postsRepository;
    constructor(postsRepository: PostsRepository);
    getOnePost(id: any): Promise<Omit<import("./posts.schema").Post & {
        _id: any;
    }, never>[]>;
    getAllComments(): Promise<void>;
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
    searchPost(body: any): Promise<any[]>;
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
    getPostTitle(): Promise<string[]>;
}
