import { IsEmail, IsString, Matches } from 'class-validator';

export class CreateSignupDetailsDto {
  // Personal Information
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^[A-Za-z\d]{8,}$/, {
    message:
      'Password must be at least 8 characters long and include at least one letter and one number.',
  })
  password: string;

  @IsString()
  city: string;

  @IsString()
  region: string;

  // Business Information
  @IsString()
  companyName: string;

  @IsString()
  businessType: string;

  @IsString()
  registrationNumber: string;

  // Payment Information
  @IsString()
  accountNumber: string;

  @IsString()
  routingNumber: string;

  @IsString()
  taxId: string;
}
