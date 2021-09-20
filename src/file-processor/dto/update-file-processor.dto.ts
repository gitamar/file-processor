import { PartialType } from '@nestjs/swagger';
import { CreateFileProcessorDto } from './create-file-processor.dto';

export class UpdateFileProcessorDto extends PartialType(CreateFileProcessorDto) {}
