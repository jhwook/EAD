import { Socket } from 'socket.io';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
export declare class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger;
    constructor();
    afterInit(): void;
    handleDisconnect(socket: Socket): void;
    handleConnection(socket: Socket): void;
    handleEnterRoom(): void;
    handleSubmitChat(data: string, socket: Socket): string;
}
