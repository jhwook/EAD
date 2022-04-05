/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-useless-constructor */
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Room } from './models/rooms.model';
import { User } from '../users/users.schema';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getRoomList(param) {
    const { id } = param;
    const roomList = await this.roomModel.find({ users: { $all: id } });
    const roomNameList = [];

    for (let i = 0; i < roomList.length; i++) {
      const roomName = roomList[i].users.find((userId) => userId !== id);
      const user = await this.userModel.findById(roomName);
      const result = { id: roomList[i].id, roomName: user.username };
      await roomNameList.push(result);
    }

    return roomNameList;
  }

  async makeRoom(body) {
    const { myId, yourId } = body;
    await this.roomModel.create({ users: [myId, yourId] });
  }

  async getRoomChat(param) {
    const { id } = param;
    const room = await this.roomModel.findById(id);
    return room;
  }
}
