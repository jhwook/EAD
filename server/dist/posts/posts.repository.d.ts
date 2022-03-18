import { Model } from 'mongoose';
import { Post } from './posts.schema';
export declare class PostsRepository {
    private readonly postModel;
    constructor(postModel: Model<Post>);
    create(post: any): Promise<Post & {
        _id: any;
    }>;
}
