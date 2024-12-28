import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order')
  async createOrder(
    @Body('amount') amount: number,
    @Body('currency') currency: string,
  ) {
    const order = await this.paypalService.createOrder(amount, currency);

    return { orderID: order };
  }

  @Get('create-order')
  async getCreateOrder() {
    return { message: 'This is a get request' };
  }

  @Post('capture-order')
  async captureOrder(@Body('orderId') orderId: string) {
    const capture = await this.paypalService.captureOrder(orderId);
    return { status: capture.status, details: capture };
  }
}
