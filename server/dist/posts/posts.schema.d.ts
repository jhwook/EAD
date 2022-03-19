/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare class Post extends Document {
    writer: string;
    title: string;
    content: string;
    tag: string[];
    comment: string[];
    imgUrl: string;
}
declare const PostSchema: import("mongoose").Schema<Post, import("mongoose").Model<Post, any, any, any>, any, any>;
export { PostSchema };
