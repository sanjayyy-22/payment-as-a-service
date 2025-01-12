import { Body, Controller, Get, Post } from '@nestjs/common';
import { LemonsqueezyService } from './lemonsqueezy.service';

@Controller('lemonsqueezy')
export class LemonsqueezyController {
  constructor(private readonly lemonsqueezyService: LemonsqueezyService) {}

  @Post('create-user')
  async createUser(@Body() data: any) {
    return this.lemonsqueezyService.createCustomer(data);
  }

  @Get('get-user')
  async getUser() {
    return 'hello';
  }
}
