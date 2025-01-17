import { Injectable, UnauthorizedException } from '@nestjs/common';

import { CreateSignupDetailsDto } from './dto/create-user-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(details: CreateSignupDetailsDto) {
    return this.userService.createUser(details);
  }

  async forgotPassword(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const token = this.jwtService.sign(
      { email },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      },
    );
    user.token = token;
    const url = `http://localhost:3000/auth/reset-password?token=${token}`;
    const text = `Click on the link to reset your password: ${url}`;
    console.log('Sending text:', text);
  }
}
