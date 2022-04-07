/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
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
import { User } from '../users/users.schema';

// namespace -> room

@WebSocketGateway()
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor(
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
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

  @SubscribeMessage(`make_room`)
  async handleMakeRoom(@MessageBody() data: string) {
    const [myId, yourId] = data;
    const userI = await this.userModel.findById(myId);

    const isExistRoom = await this.roomModel.find({ users: [myId, yourId] });

    if (isExistRoom.length === 0) {
      const room = await this.roomModel.create({ users: [myId, yourId] });
      const chat = await this.chattingModel.create({
        room_id: room.id,
        user: userI.username,
        content: `${userI.username}님이 채팅을 요청했습니다.`,
        userImg: userI.imgUrl,
      });
      await this.roomModel.findByIdAndUpdate(room.id, {
        $push: { chatting: { $each: [chat.id], $position: 0 } },
      });
      return room.id;
    }

    return isExistRoom[0].id;
  }

  @SubscribeMessage('enter_room')
  handleEnterRoom(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(data);
    socket.to(data).emit('welcome', data);
    return data;
  }

  @SubscribeMessage('bye')
  async handleExitRoom(@MessageBody() data) {
    const [room, roomId, userId] = data;
    const user = await this.userModel.findById(userId);
    const roomInfo = await this.roomModel.findById(roomId);

    if (roomInfo.users.length > 1) {
      const chat = await this.chattingModel.create({
        room_id: roomId,
        user: user.username,
        content: `${user.username}님이 채팅방을 떠났습니다.`,
        userImg: user.imgUrl,
      });
      await this.roomModel.findByIdAndUpdate(roomInfo.id, {
        $push: { chatting: { $each: [chat.id], $position: 0 } },
      });
      await this.roomModel.findByIdAndUpdate(roomInfo.id, {
        $pull: { users: user.id },
      });
      await this.roomModel.findByIdAndUpdate(roomInfo.id, {
        leftUser: userId,
      });
    } else {
      for (let i = 0; i < roomInfo.chatting.length; i++) {
        await this.chattingModel.findByIdAndDelete(roomInfo.chatting[i]);
      }
      await this.roomModel.findByIdAndDelete(roomId);
    }
    return room;
  }

  @SubscribeMessage('new_message')
  async handleSubmitChat(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const [message, room, roomId, myUsername] = data;
    const myUser = await this.userModel.findOne({ username: myUsername });

    const chat = await this.chattingModel.create({
      user: myUsername,
      content: message,
      room_id: roomId,
      userImg: myUser.imgUrl,
    });
    await this.roomModel.findByIdAndUpdate(roomId, {
      $push: { chatting: { $each: [chat.id], $position: 0 } },
    });

    socket.to(room).emit('new_message', `${myUsername}: ${message}`);
    return message;
  }
}
