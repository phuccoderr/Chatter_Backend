import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AbstractEntity } from 'src/common/database/abstract.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User extends AbstractEntity {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
