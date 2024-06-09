import { ApiProperty } from '@nestjs/swagger';

export class UserSendMessageInput {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  message: string;
}
