import { Module } from '@nestjs/common';
import { FileProcessorService } from './file-processor.service';
import { FileProcessorController } from './file-processor.controller';
import { FileProcessRequest } from './proto/fileReq_pb';
import { Crypto } from 'src/utils/crypto';
import { ConfigService } from '@nestjs/config';
import { FileOps } from 'src/utils/file';

@Module({
  controllers: [FileProcessorController],
  providers: [
    FileProcessorService,
    FileProcessRequest,
    Crypto,
    ConfigService,
    FileOps,
  ],
})
export class FileProcessorModule {}
