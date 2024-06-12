import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Conversation,
  ConversationDocument,
} from './schema/conversation.schema';
import { Model, Types } from 'mongoose';
import { ConversationInput } from './dto/conversation.input';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<ConversationDocument>,
  ) {}

  async getConversation({ senderId, receiverId }: ConversationInput) {
    return await this.conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });
  }

  async getConversationByMessage({ senderId, receiverId }: ConversationInput) {
    return await this.conversationModel
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })
      .populate('messages', '-_id');
  }

  async createConversation({ senderId, receiverId }: ConversationInput) {
    return await this.conversationModel.create({
      participants: [senderId, receiverId],
      _id: new Types.ObjectId(),
    });
  }
}
