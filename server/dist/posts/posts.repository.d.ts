import { Model } from 'mongoose';
import { Post } from './posts.schema';
export declare class PostsRepository {
    private readonly postModel;
    constructor(postModel: Model<Post>);
    create(post: any): Promise<Post & {
        _id: any;
    }>;
    findPostById(id: any): Promise<Post & {
        _id: any;
    }>;
    findPostByIdAndUpdate(id: any, body: any): Promise<Post & {
        _id: any;
    }>;
    findPostByIdAndDelete(id: any): Promise<Post & {
        _id: any;
    }>;
}
