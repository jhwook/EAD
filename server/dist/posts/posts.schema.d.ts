import mongoose, { Document } from 'mongoose';
export declare class Post extends Document {
    writer: string;
    title: string;
    content: string;
    tag: string[];
    comment: [];
    imgUrl: string;
}
declare const PostSchema: mongoose.Schema<Post, mongoose.Model<Post, any, any, any>, any, any>;
export { PostSchema };
