/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-useless-constructor */
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Room } from './models/rooms.model';
import { User } from '../users/users.schema';
import { Chatting } from './models/chattings.model';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
  ) {}

  async newChat(param, body) {
    const { roomId } = param;
    const { userId, content } = body;
    const user = await this.userModel.findById(userId);
    const comment = await this.chattingModel.create({
      user: user.username,
      content,
      userImg: user.imgUrl,
      room_id: roomId,
    });
    await this.roomModel.findByIdAndUpdate(roomId, {
      $push: { chatting: { $each: [comment.id] } },
    });
  }

  async getRoomList(param) {
    const { id } = param;
    const roomList = await this.roomModel.find({ users: { $all: id } });

    console.log(roomList);
    const roomNameList = [];

    for (let i = 0; i < roomList.length; i++) {
      if (roomList[i].users.length > 1) {
        const roomName = roomList[i].users.find((userId) => userId !== id);
        const user = await this.userModel.findById(roomName);

        const result = {
          id: roomList[i].id,
          roomName: user.username,
          image: user.imgUrl,
        };
        await roomNameList.push(result);
      } else {
        const leftUser = await this.userModel.findById(roomList[i].leftUser);
        const result = {
          id: roomList[i].id,
          roomName: leftUser.username,
          image: leftUser.imgUrl,
        };
        await roomNameList.push(result);
      }
    }

    return roomNameList;
  }

  async makeRoom(body) {
    const { myId, yourId } = body;
    await this.roomModel.create({ users: [myId, yourId] });
  }

  async getRoomChat(param) {
    const { id } = param;
    // const rooms = await this.roomModel.find({ users: { $all: id } });
    const room = await this.roomModel.findById(id).populate('chattings');

    console.log('===============');

    return room;
  }
}
