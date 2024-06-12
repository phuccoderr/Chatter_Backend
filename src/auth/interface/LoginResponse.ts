import { UserResponse } from 'src/users/interface/user.response';

export interface LoginResponse {
  access_token: string;
  info: UserResponse;
}
