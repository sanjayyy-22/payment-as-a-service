import * as paypal from '@paypal/checkout-server-sdk';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PaypalService {
  private readonly client: paypal.core.PayPalHttpClient;
  private readonly environment:
    | paypal.core.LiveEnvironment
    | paypal.core.SandboxEnvironment;

  constructor() {
    this.environment = new paypal.core.SandboxEnvironment(
      'Af-MKz0DVBNVGTX3pwuPRY4fmwkLTwxOMhwwNz-S4_iy7_se95Z7RFHBgYlPy1B4UotScp8QUC1Nd-e1',
      'EHSgYm6QnDrbEnJp1hUirsZVJCuEO1RBP6FA19mv89mr41h4FCsPB4LC6_8MAFYZ_w4DrK-lpU9mflo-',
    );
    this.client = new paypal.core.PayPalHttpClient(this.environment);
  }
  async createOrder(amount: number, currency: string) {
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency || 'USD',
            value: amount.toString(),
          },
        },
      ],
    });

    try {
      const response = await this.client.execute(request);
      return response.result.id;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async captureOrder(orderID: string) {
    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});

    try {
      const response = await this.client.execute(request);
      return response.result;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
}
