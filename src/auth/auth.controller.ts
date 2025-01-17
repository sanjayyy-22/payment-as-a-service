import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSignupDetailsDto } from './dto/create-user-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: any) {
    return this.authService.login(data.email, data.password);
  }

  @Post('register')
  async register(@Body() data: CreateSignupDetailsDto) {
    return this.authService.register(data);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() email: string) {
    return this.authService.forgotPassword(email);
  }
}
