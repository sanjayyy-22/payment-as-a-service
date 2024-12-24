import { LemonsqueezyModule } from './lemonsqueezy/lemonsqueezy.module';
import { LemonsqueezyService } from './lemonsqueezy/lemonsqueezy.service';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    LemonsqueezyModule,
  ],
  controllers: [LemonsqueezyModule],
  providers: [LemonsqueezyService],
  exports: [LemonsqueezyService],
})
export class AppModule {}
