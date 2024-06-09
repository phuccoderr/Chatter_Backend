import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credentials.input';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './interface/LoginResponse';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() auth: AuthCredentials): Promise<LoginResponse> {
    return this.authService.login(auth);
  }
}
