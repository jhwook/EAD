import mongoose, { Document } from 'mongoose';
import { Post } from './posts.schema';
export declare class Comment extends Document {
    post_id: Post;
    writer: string;
    content: string;
    up: number;
    imgUrl: string;
}
declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any>, any, any>;
export { CommentSchema };
