import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { DatabaseModule } from 'src/common/database/database.module';
import { Conversation, ConversationSchema } from './schema/conversation.schema';

@Module({
  imports: [
    DatabaseModule.forFeature([
      { name: Conversation.name, schema: ConversationSchema },
    ]),
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
