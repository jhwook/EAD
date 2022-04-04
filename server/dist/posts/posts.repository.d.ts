import { Model } from 'mongoose';
import { Post } from './posts.schema';
import { Comment } from './comments.schema';
export declare class PostsRepository {
    private readonly postModel;
    private readonly commentModel;
    constructor(postModel: Model<Post>, commentModel: Model<Comment>);
    findPostById(id: any): Promise<Post & {
        _id: any;
    }>;
    findCommentById(commentId: any): Promise<Comment & {
        _id: any;
    }>;
    getTitle(): Promise<{
        id: any;
        title: string;
        tag: string[];
    }[]>;
}
