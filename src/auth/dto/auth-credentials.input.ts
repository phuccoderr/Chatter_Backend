import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthCredentials {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
