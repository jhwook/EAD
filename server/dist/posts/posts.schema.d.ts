import mongoose, { Types, Document } from 'mongoose';
export declare class Post extends Document {
    writer: Types.ObjectId;
    writerName: string;
    title: string;
    content: string;
    tag: string[];
    comment: [];
    imgUrl: string;
    bounty: number;
}
export declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any>, any, any>;
