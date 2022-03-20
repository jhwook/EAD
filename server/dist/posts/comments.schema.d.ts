import mongoose, { Document } from 'mongoose';
export declare class Comment extends Document {
    writer: string;
    content: string;
    up: number;
    imgUrl: string;
}
declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any>, any, any>;
export { CommentSchema };
