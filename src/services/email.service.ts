import { AuthService } from '../auth/auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly authService: AuthService) {}
  async sendMail(data: { to: string; subject: string; text: string }) {
    console.log('Sending email to:', data.to);
  }
}
