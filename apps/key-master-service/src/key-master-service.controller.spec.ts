import { Test, TestingModule } from '@nestjs/testing';
import { KeyMasterServiceController } from './key-master-service.controller';
import { KeyMasterServiceService } from './key-master-service.service';

describe('KeyMasterServiceController', () => {
  let keyMasterServiceController: KeyMasterServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [KeyMasterServiceController],
      providers: [KeyMasterServiceService],
    }).compile();

    keyMasterServiceController = app.get<KeyMasterServiceController>(
      KeyMasterServiceController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(keyMasterServiceController.getHello()).toBe('Hello World!');
    });
  });
});
