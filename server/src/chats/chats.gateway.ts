/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable class-methods-use-this */
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chatting } from './models/chattings.model';
import { Room } from './models/rooms.model';

// namespace -> room

@WebSocketGateway()
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor(
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {
    this.logger.log('constructor');
  }

  afterInit() {
    this.logger.log('init');
  }

  // 연결이 끊길 때 실행
  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`);
  }

  // 연결이 되자마자 실행
  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('enter_room')
  handleEnterRoom(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(socket.rooms);
    console.log(data);

    socket.join(data);
    socket.to(data).emit('welcome', data);
    return data;
  }

  @SubscribeMessage('bye')
  handleMakeRoom(@MessageBody() room, @ConnectedSocket() socket: Socket) {
    socket.to(room).emit('bye', room);
  }

  @SubscribeMessage('new_message')
  async handleSubmitChat(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const [message, room, roomId, myUsername] = data;

    const chat = await this.chattingModel.create({
      user: myUsername,
      content: message,
      room_id: roomId,
    });
    await this.roomModel.findByIdAndUpdate(room, {
      $push: { chatting: { $each: [chat.id], $position: 0 } },
    });

    socket.to(room).emit('new_message', `${myUsername}: ${message}`);
    return message;
  }
}
