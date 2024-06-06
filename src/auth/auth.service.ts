import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthCredentials } from './dto/auth-credentials.input';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: AuthCredentials) {
    const user = await this.usersService.verifyUser(email, password);

    const payload = { sub: user._id, username: user.email };
    return await this.jwtService.signAsync(payload);
  }
}