import * as bcrypt from 'bcrypt';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateSignupDetailsDto } from '../auth/dto/create-user-auth.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(details: CreateSignupDetailsDto) {
    const hashedPassword = await bcrypt.hash(details.password, 10);
    const email = await this.getUserByEmail(details.email);
    if (email) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.user.create({
      data: {
        name: details.name,
        email: details.email,
        password: hashedPassword,
        city: details.city,
        region: details.region,
        companyName: details.companyName,
        businessType: details.businessType,
        registrationNumber: details.registrationNumber,
        accountNumber: details.accountNumber,
        routingNumber: details.routingNumber,
        taxId: details.taxId,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }
}
