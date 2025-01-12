import { LemonsqueezyController } from './lemonsqueezy.controller';
import { LemonsqueezyService } from './lemonsqueezy.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [LemonsqueezyService],
  controllers: [LemonsqueezyController],
})
export class LemonsqueezyModule {}
