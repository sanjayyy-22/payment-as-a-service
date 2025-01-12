import { Test, TestingModule } from '@nestjs/testing';
import { LemonsqueezyController } from './lemonsqueezy.controller';

describe('LemonsqueezyController', () => {
  let controller: LemonsqueezyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LemonsqueezyController],
    }).compile();

    controller = module.get<LemonsqueezyController>(LemonsqueezyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
