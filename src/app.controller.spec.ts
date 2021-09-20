import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Health check', () => {
    it('should return "pass"', () => {
      const data = appController.healthCheck();
      expect(data.status).toBe('pass');
    });

    it('should return the health check object', () => {
      const expectedHealthCheckData = {
        version: 'v0.0.1',
        status: 'pass',
        serviceId: '1',
        notes: ['This service manages file processing!'],
        releaseId: 'b2a42aa',
        description: 'This service does file proccessing.',
      };

      const data = appController.healthCheck();

      expect(data.serviceId).toStrictEqual(expectedHealthCheckData.serviceId);
    });
  });
});
