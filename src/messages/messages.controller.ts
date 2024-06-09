import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { UserSendMessageInput } from './dto/user-sendMessage.input';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('messages-controller')
@Controller('message')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Post('/:id')
  getMessages(
    @Param('id') id: string,
    @Body() userSendMessageInput: UserSendMessageInput,
  ) {
    return this.messageService.sendMessage(id, userSendMessageInput);
  }
}
