import { Test, TestingModule } from '@nestjs/testing';
import { PinfingerGateway } from './pinfinger.gateway';

describe('PinfingerGateway', () => {
  let gateway: PinfingerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinfingerGateway],
    }).compile();

    gateway = module.get<PinfingerGateway>(PinfingerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
