import { AuthModule } from '../auth/auth.module';
import { LemonsqueezyController } from './lemonsqueezy.controller';
import { LemonsqueezyService } from './lemonsqueezy.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [AuthModule],
  providers: [LemonsqueezyService],
  controllers: [LemonsqueezyController],
})
export class LemonsqueezyModule {}
