/* eslint-disable no-useless-constructor */
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Room } from './models/rooms.model';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}

  async getRoomList(param) {
    const { id } = param;
    const roomList = await this.roomModel.find({ users: { $all: id } });
    const roomNameList = roomList.map((room) => {
      const roomName = room.users.find((userId) => userId !== id);
      const result = { id: room.id, roomName };
      return result;
    });

    return roomNameList;
  }

  async makeRoom(body) {
    const { myId, yourId } = body;
    await this.roomModel.create({ users: [myId, yourId] });
  }
}
