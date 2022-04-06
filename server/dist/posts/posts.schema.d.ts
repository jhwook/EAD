import mongoose, { Types, Document } from 'mongoose';
export declare class Post extends Document {
    writer: Types.ObjectId;
    writerName: string;
    writerImg: string;
    title: string;
    content: string;
    tag: string[];
    comment: [];
    bounty: number;
    selection: boolean;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any>, any, any>;
