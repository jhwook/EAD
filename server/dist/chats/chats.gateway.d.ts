import { Socket } from 'socket.io';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Chatting } from './models/chattings.model';
import { Room } from './models/rooms.model';
export declare class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly chattingModel;
    private readonly roomModel;
    private logger;
    constructor(chattingModel: Model<Chatting>, roomModel: Model<Room>);
    afterInit(): void;
    handleDisconnect(socket: Socket): void;
    handleConnection(socket: Socket): void;
    handleEnterRoom(data: string, socket: Socket): string;
    handleMakeRoom(room: any, socket: Socket): void;
    handleSubmitChat(data: string, socket: Socket): string;
}
