import { LemonsqueezyService } from './lemonsqueezy.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [LemonsqueezyService],
})
export class LemonsqueezyModule {}
