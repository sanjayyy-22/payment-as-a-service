import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LemonsqueezyService } from './lemonsqueezy.service';
import { CurrentUser } from '../decorator/user.decorator';

@Controller('lemonsqueezy')
export class LemonsqueezyController {
  constructor(private readonly lemonsqueezyService: LemonsqueezyService) {}

  @Post('create-user')
  async createUser(@Body() data: any, @CurrentUser user: any) {
    return this.lemonsqueezyService.createCustomer(data, user);
  }

  @Get('get-user/:id')
  async getUser(@Param() id: any) {
    return this.lemonsqueezyService.getCustomer(id);
  }
}
