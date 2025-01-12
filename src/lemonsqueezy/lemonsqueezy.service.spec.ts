import { Test, TestingModule } from '@nestjs/testing';
import { LemonsqueezyService } from './lemonsqueezy.service';

describe('LemonsqueezyService', () => {
  let service: LemonsqueezyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LemonsqueezyService],
    }).compile();

    service = module.get<LemonsqueezyService>(LemonsqueezyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
