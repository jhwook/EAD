import { Model } from 'mongoose';
import { Room } from './models/rooms.model';
import { User } from '../users/users.schema';
import { Chatting } from './models/chattings.model';
export declare class ChatsService {
    private readonly roomModel;
    private readonly userModel;
    private readonly chattingModel;
    constructor(roomModel: Model<Room>, userModel: Model<User>, chattingModel: Model<Chatting>);
    newChat(param: any, body: any): Promise<void>;
    getRoomList(param: any): Promise<any[]>;
    makeRoom(body: any): Promise<void>;
    getRoomChat(param: any): Promise<Room & {
        _id: any;
    }>;
}
