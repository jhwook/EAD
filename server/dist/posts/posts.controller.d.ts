/// <reference types="multer" />
import { AuthService } from 'src/auth/auth.service';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    private readonly authService;
    constructor(postsService: PostsService, authService: AuthService);
    createPost(body: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    getPostTitle(): Promise<{
        id: any;
        title: string;
        tag: string[];
    }[]>;
    searchPost(keyword: any): Promise<{
        id: any;
        title: any;
        tag: any;
    }[]>;
    searchPostByTag(body: any): Promise<any[]>;
    getOnePost(id: string): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    updatePost(body: any, param: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    deletePost(param: any, body: any): Promise<{
        message: string;
    }>;
    createComment(body: any, param: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    modifyComment(body: any, param: any): Promise<import("./comments.schema").Comment & {
        _id: any;
    }>;
    deleteComment(param: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    getOneComment(param: any): Promise<import("./comments.schema").Comment & {
        _id: any;
    }>;
    uploadPostImage(files: Array<Express.Multer.File>, param: any, body: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    uploadCommentImage(files: Array<Express.Multer.File>, param: any, body: any): Promise<import("./comments.schema").Comment & {
        _id: any;
    }>;
}
