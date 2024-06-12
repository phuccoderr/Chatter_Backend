import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UserSendMessageInput } from './dto/user-sendMessage.input';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('messages-controller')
@Controller('message')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Post('/send/:id')
  sendMessage(
    @Param('id') id: string,
    @Body() userSendMessageInput: UserSendMessageInput,
  ) {
    return this.messageService.sendMessage(id, userSendMessageInput);
  }

  @Get('/:id')
  getMessages(@Param('id') id: string, @Query('userId') userId: string) {
    return this.messageService.getMessages(id, userId);
  }
}
