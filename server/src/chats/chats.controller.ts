/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post('/make-room')
  makeRoom(@Body() body) {
    return this.chatsService.makeRoom(body);
  }

  @Get('/room-list/:id')
  getRoomList(@Param() param) {
    return this.chatsService.getRoomList(param);
  }

  @Get('/rooms/:id')
  getRoomChat(@Param() param) {
    return this.chatsService.getRoomChat(param);
  }

  @Post('/:roomId')
  newChat(@Param() param, @Body() body) {
    return this.chatsService.newChat(param, body);
  }
}
