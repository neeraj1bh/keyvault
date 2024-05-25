import { Test, TestingModule } from '@nestjs/testing';
import { TokenInfoServiceController } from './token-info-service.controller';
import { TokenInfoServiceService } from './token-info-service.service';

describe('TokenInfoServiceController', () => {
  let tokenInfoServiceController: TokenInfoServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TokenInfoServiceController],
      providers: [TokenInfoServiceService],
    }).compile();

    tokenInfoServiceController = app.get<TokenInfoServiceController>(TokenInfoServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(tokenInfoServiceController.getHello()).toBe('Hello World!');
    });
  });
});
