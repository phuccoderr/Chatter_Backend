import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

export type ConversationDocument = HydratedDocument<Conversation>;

@Schema({ versionKey: false })
export class Conversation extends AbstractEntity {
  @Prop({
    ref: 'User',
  })
  participants: Types.ObjectId[];

  @Prop({
    ref: 'Message',
    default: [],
  })
  messages: Types.ObjectId[];

  @Prop({})
  createdAt: Date;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
