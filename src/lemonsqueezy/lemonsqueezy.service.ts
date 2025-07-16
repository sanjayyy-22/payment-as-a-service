import { Injectable, UseGuards } from '@nestjs/common';

import { GatewayType } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-guard.auth';
import { LEMONSQUEEZY_CREATE_CUSTOMER } from '../constants/route.constants';
import axios from 'axios';
import { lemonSqueezyConfig } from '../config/lemonSqueezy.config';
import prisma from '../prisma';

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

  @UseGuards(JwtAuthGuard)
  async createCustomer(data: any, user: any) {
    console.log('user', user);
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
        const { data } = response.data;
        const externalCustomer = await prisma.externalCustomer.create({
          data: {
            externalId: data.id,
            provider: GatewayType.LEMONSQUEEZY,
            user: {
              connect: {
                id: '22578ed6-93bc-4409-b549-daae56d352e9',
              },
            },
          },
        });
        const customer = await prisma.user.update({
          where: {
            id: '22578ed6-93bc-4409-b549-daae56d352e9',
            // externalCustomerId: data.id,
          },
          data: {
            externalCustomerId: {
              connect: {
                id: externalCustomer.id,
              },
            },
          },
        });
        return customer;
      }
      if (response.status == 422) {
        data.errors = response.data.errors.detail;
        return data;
      }
    } catch (error) {
      console.error(error);
      throw new Error(error.statusText);
    }
  }

  async getCustomer(id: any) {
    try {
      console.log('user', id);
      return await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
