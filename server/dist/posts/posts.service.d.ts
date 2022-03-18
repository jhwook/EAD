import { PostsRepository } from './posts.repository';
export declare class PostsService {
    private readonly postsRepository;
    constructor(postsRepository: PostsRepository);
    createPost(body: any): Promise<import("./posts.schema").Post & {
        _id: any;
    }>;
}
