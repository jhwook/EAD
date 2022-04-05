import { ChatsService } from './chats.service';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    getRoomList(param: any): Promise<any[]>;
    makeRoom(body: any): Promise<void>;
    getRoomChat(param: any): Promise<(import("./models/rooms.model").Room & {
        _id: any;
    })[]>;
}
