import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserInput {
  @ApiProperty({ description: 'Email user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password user' })
  @IsNotEmpty()
  password: string;
}
