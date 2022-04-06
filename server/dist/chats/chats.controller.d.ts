import { ChatsService } from './chats.service';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    makeRoom(body: any): Promise<void>;
    getRoomList(param: any): Promise<any[]>;
    getRoomChat(param: any): Promise<import("./models/rooms.model").Room & {
        _id: any;
    }>;
    newChat(param: any, body: any): Promise<void>;
}
