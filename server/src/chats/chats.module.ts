import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserSchema, User } from 'src/users/users.schema';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { Room, RoomSchema } from './models/rooms.model';
import { ChatsGateway } from './chats.gateway';
import { Chatting, ChattingSchema } from './models/chattings.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatting.name, schema: ChattingSchema },
      { name: Room.name, schema: RoomSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [ChatsController],
  providers: [ChatsGateway, ChatsService],
  exports: [ChatsGateway, ChatsService],
})
export class ChatsModule {}
