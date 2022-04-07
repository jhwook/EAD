/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document, Types } from 'mongoose';
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
declare const CommentSchema: import("mongoose").Schema<Comment, import("mongoose").Model<Comment, any, any, any>, any, any>;
export { CommentSchema };
