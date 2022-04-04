/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
import { Chatting } from './chattings.model';
export declare class Room extends Document {
    roomName: string;
    chat: Chatting;
    users: [];
}
declare const RoomSchema: import("mongoose").Schema<Room, import("mongoose").Model<Room, any, any, any>, any, any>;
export { RoomSchema };
