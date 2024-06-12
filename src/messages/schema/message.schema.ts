import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ versionKey: false })
export class Message extends AbstractEntity {
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  senderId: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  receiverId: string;

  @Prop({
    required: true,
  })
  message: string;

  @Prop({
    type: Date,
  })
  createdAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
