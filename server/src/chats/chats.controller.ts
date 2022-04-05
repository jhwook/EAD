/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get('/room-list/:id')
  getRoomList(@Param() param) {
    console.log('hi');
    return this.chatsService.getRoomList(param);
  }

  @Post('/make-room')
  makeRoom(@Body() body) {
    return this.chatsService.makeRoom(body);
  }

  @Get('/rooms/:id')
  getRoomChat(@Param() param) {
    return this.chatsService.getRoomChat(param);
  }
}
