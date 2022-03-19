import { AuthService } from 'src/auth/auth.service';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    private readonly authService;
    constructor(postsService: PostsService, authService: AuthService);
    createPost(req: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    updatePost(req: any, param: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    deletePost(param: any): Promise<void>;
    searchPost(body: any): Promise<any[]>;
    searchPostByTag(body: any): Promise<any[]>;
}
