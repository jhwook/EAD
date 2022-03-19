import { PostsRepository } from './posts.repository';
export declare class PostsService {
    private readonly postsRepository;
    constructor(postsRepository: PostsRepository);
    createPost(req: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    updatePost(req: any, param: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
    deletePost(param: any): Promise<void>;
    searchPost(body: any): Promise<any[]>;
}
