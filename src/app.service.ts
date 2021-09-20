import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthCheckData } from './global-dto/app.dto';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  healthCheck(): HealthCheckData {
    return {
      version: this.configService.get<string>('version'),
      status: 'pass',
      serviceId: '1',
      notes: ['This service manages file processing!'],
      releaseId: this.configService.get<string>('releaseId'),
      description: 'This service does file proccessing.',
    };
  }
}
