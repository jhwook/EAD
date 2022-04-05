import { ChatsService } from './chats.service';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    getRoomList(param: any): Promise<{
        id: any;
        roomName: never;
    }[]>;
    makeRoom(body: any): Promise<void>;
}
