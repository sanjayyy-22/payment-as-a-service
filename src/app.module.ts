import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LemonsqueezyModule } from './lemonsqueezy/lemonsqueezy.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PaypalModule } from './paypal/paypal.module';
import { PrismaModule } from './prisma/prisma.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { join } from 'path';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    PaypalModule,
    LemonsqueezyModule,
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    PrismaModule,
  ],

  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
