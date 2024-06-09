import { Injectable } from '@nestjs/common';
import { UserSendMessageInput } from './dto/user-sendMessage.input';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schema/message.schema';
import { Model, Types } from 'mongoose';
import { ConversationsService } from 'src/conversations/conversations.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private conversationService: ConversationsService,
  ) {}

  async sendMessage(id: string, userSendMessageInput: UserSendMessageInput) {
    const senderId = userSendMessageInput.userId;
    const message = userSendMessageInput.message;
    const receiverId = id;

    let conversation = await this.conversationService.getConversation({
      senderId,
      receiverId,
    });

    if (!conversation) {
      conversation = await this.conversationService.createConversation({
        senderId,
        receiverId,
      });
    }
    const newMessage = new this.messageModel({
      _id: new Types.ObjectId(),
      senderId,
      receiverId,
      message,
      createdAt: new Date(),
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await newMessage.save();
    await conversation.save();
  }

  getMessages() {}
}
