/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
import { Types, Document } from 'mongoose';
export declare class Chatting extends Document {
    user: Types.ObjectId;
    content: string;
}
declare const ChattingSchema: import("mongoose").Schema<Chatting, import("mongoose").Model<Chatting, any, any, any>, any, any>;
export { ChattingSchema };
