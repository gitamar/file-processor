import { Controller, Get, Param, Version } from '@nestjs/common';
import { FileProcessorService } from './file-processor.service';
import { EventPattern } from '@nestjs/microservices';
import { IEncryptedData } from './interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('File Processor')
@Controller('file-processor')
export class FileProcessorController {
  constructor(private readonly fileProcessorService: FileProcessorService) {}

  @Version('1')
  @Get('/:fileName')
  findOne(@Param('fileName') fileName: string) {
    return this.fileProcessorService.findOne(fileName);
  }

  @EventPattern('create-file')
  async storeDataToFile(data: IEncryptedData) {
    await this.fileProcessorService.storeDataToFile(data);
  }

  @EventPattern('update-file')
  async updateDataToFile(data: IEncryptedData) {
    await this.fileProcessorService.storeDataToFile(data);
  }
}
