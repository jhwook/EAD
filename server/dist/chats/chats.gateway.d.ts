import { Socket } from 'socket.io';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Chatting } from './models/chattings.model';
import { Room } from './models/rooms.model';
import { User } from '../users/users.schema';
export declare class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly chattingModel;
    private readonly roomModel;
    private readonly userModel;
    private logger;
    constructor(chattingModel: Model<Chatting>, roomModel: Model<Room>, userModel: Model<User>);
    afterInit(): void;
    handleDisconnect(socket: Socket): void;
    handleConnection(socket: Socket): void;
    handleMakeRoom(data: string): Promise<any>;
    handleEnterRoom(data: string, socket: Socket): string;
    handleExitRoom(data: any): Promise<any>;
    handleSubmitChat(data: string, socket: Socket): Promise<string>;
}
