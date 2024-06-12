import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthCredentials } from './dto/auth-credentials.input';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './interface/LoginResponse';
import { UserResponse } from 'src/users/interface/user.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: AuthCredentials): Promise<LoginResponse> {
    const user = await this.usersService.verifyUser(email, password);

    const payload = { sub: user._id, username: user.email };
    const token = await this.jwtService.signAsync(payload);

    const info: UserResponse = { _id: user._id, email: user.email };

    return { access_token: token, info };
  }
}
