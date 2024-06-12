import { Module } from '@nestjs/common';
import { MyGateway } from './gateway';
import { MessagesModule } from 'src/messages/messages.module';
@Module({
  imports: [MessagesModule],
  providers: [MyGateway],
})
export class GatewayModule {}
