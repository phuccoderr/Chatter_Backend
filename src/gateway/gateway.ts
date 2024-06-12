import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { UserSendMessageInput } from 'src/messages/dto/user-sendMessage.input';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class MyGateway implements OnModuleInit {
  constructor(private readonly messageService: MessagesService) {}
  onModuleInit() {
    this.server.on('connection', (socket: Socket) => {
      console.log(socket.id);
      console.log('connected');
    });
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMessages')
  async handleMessage(
    @MessageBody() data: { id: string; message: UserSendMessageInput },
  ) {
    try {
      const response = await this.messageService.sendMessage(
        data.id,
        data.message,
      );
      this.server.emit('onMessage', data.message);
    } catch (error) {
      throw new WsException('Invalid credentials.');
    }
  }
}
