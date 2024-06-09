import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class AbstractEntity {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
