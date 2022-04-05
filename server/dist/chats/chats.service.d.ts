import { Model } from 'mongoose';
import { Room } from './models/rooms.model';
import { User } from '../users/users.schema';
export declare class ChatsService {
    private readonly roomModel;
    private readonly userModel;
    constructor(roomModel: Model<Room>, userModel: Model<User>);
    getRoomList(param: any): Promise<any[]>;
    makeRoom(body: any): Promise<void>;
    getRoomChat(param: any): Promise<Room & {
        _id: any;
    }>;
}
