import { Injectable } from '@nestjs/common';
import { LEMONSQUEEZY_CREATE_CUSTOMER } from '../constants/route.constants';
import axios from 'axios';
import { lemonSqueezyConfig } from '../config/lemonSqueezy.config';

@Injectable()
export class LemonsqueezyService {
  private readonly axiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: lemonSqueezyConfig.apiBaseUrl,
      headers: {
        Authorization: `Bearer ${lemonSqueezyConfig.apiKey}`,
      },
    });
  }

  async createCustomer(data: any) {
    try {
      const { email, name, city, region, country, storeId } = data;
      const response = await this.axiosInstance.post(
        LEMONSQUEEZY_CREATE_CUSTOMER,
        {
          data: {
            type: 'customers',
            attributes: {
              name: name,
              email: email,
              city: city,
              region: region,
              country: country,
            },
            relationships: {
              store: {
                data: {
                  type: 'stores',
                  id: storeId,
                },
              },
            },
          },
        },
      );
      if (response.status === 201) {
        return response.data;
      }
      if (response.status == 422) {
        data.errors = response.data.errors.detail;
        return data;
      }
    } catch (error) {
      console.error(error.message || error);
      throw new Error(error);
    }
  }
}
