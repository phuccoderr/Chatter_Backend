import { Types } from 'mongoose';

export interface UserResponse {
  _id: Types.ObjectId;
  email: string;
}
