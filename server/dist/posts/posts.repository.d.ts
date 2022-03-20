import { Model } from 'mongoose';
import { Post } from './posts.schema';
import { Comment } from './comments.schema';
export declare class PostsRepository {
    private readonly postModel;
    private readonly commentModel;
    constructor(postModel: Model<Post>, commentModel: Model<Comment>);
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
    searchPostInDB(keyword: any): Promise<any[]>;
    searchPostByTag(tag: any): Promise<any[]>;
    addComment(content: any, postId: any, username: any): Promise<Post & {
        _id: any;
    }>;
    editComment(newComment: any, commentId: any): Promise<void>;
    deleteComment(commentId: any): Promise<void>;
    getTitle(): Promise<string[]>;
}
