import { Model } from 'mongoose';
import { Post } from './posts.schema';
import { Comment } from './comments.schema';
export declare class PostsRepository {
    private readonly postModel;
    private readonly commentModel;
    constructor(postModel: Model<Post>, commentModel: Model<Comment>);
    getOnePost(id: any): Promise<Post & {
        _id: any;
    }>;
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
    searchPostInDB(keyword: any): Promise<{
        id: any;
        title: any;
        tag: any;
    }[]>;
    searchPostByTag(tag: any): Promise<any[]>;
    addComment(content: any, postId: any, id: any): Promise<Post & {
        _id: any;
    }>;
    editComment(content: any, commentId: any): Promise<Comment & {
        _id: any;
    }>;
    deleteComment(commentId: any): Promise<Post & {
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
    findPostAndUpdateImg(id: string, fileName: string): Promise<Post & {
        _id: any;
    }>;
    findCommentAndUpdateImg(id: string, fileName: string): Promise<Comment & {
        _id: any;
    }>;
}
