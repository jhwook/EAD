import mongoose, { Document, Types } from 'mongoose';
export declare class Comment extends Document {
    post_id: Types.ObjectId;
    writer: Types.ObjectId;
    writerName: string;
    writerImg: string;
    title: string;
    content: string;
    up: number;
    selection: boolean;
}
declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any>, any, any>;
export { CommentSchema };
