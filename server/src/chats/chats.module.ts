import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Room, RoomSchema } from './models/rooms.model';
import { ChatsGateway } from './chats.gateway';
import { Chatting, ChattingSchema } from './models/chattings.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatting.name, schema: ChattingSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  providers: [ChatsGateway],
})
export class ChatsModule {}
