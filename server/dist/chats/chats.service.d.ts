import { Model } from 'mongoose';
import { Room } from './models/rooms.model';
export declare class ChatsService {
    private readonly roomModel;
    constructor(roomModel: Model<Room>);
    getRoomList(param: any): Promise<{
        id: any;
        roomName: never;
    }[]>;
    makeRoom(body: any): Promise<void>;
}
