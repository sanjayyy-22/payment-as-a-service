import { Module } from '@nestjs/common';
import { PaypalModule } from './paypal/paypal.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    PaypalModule,
  ],

  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
