import { Injectable } from '@nestjs/common';
import { FileProcessRequest } from './proto/fileReq_pb';
import { Crypto } from 'src/utils/crypto';
import { ConfigService } from '@nestjs/config';
import { IEncryptedData } from './interface';
import { FileOps } from 'src/utils/file';
import { FileType } from './enum';

@Injectable()
export class FileProcessorService {
  constructor(
    private fileProcessRequest?: FileProcessRequest,
    private crypto?: Crypto,
    private configService?: ConfigService,
    private fileOps?: FileOps,
  ) {}

  findOne(fileName: string) {
    console.log(`This action returns a #${fileName} fileProcessor`);
    return this.fileOps.readFromDisk(fileName);
  }

  async storeDataToFile(encryptedData: IEncryptedData) {
    const decryptedData = await this.crypto.decrypt(
      encryptedData,
      this.configService.get('secretKey'),
    );
    const decodedDataBytes = Buffer.from(decryptedData);
    const decodedData = FileProcessRequest.deserializeBinary(decodedDataBytes);
    const decodedDataObject = decodedData.toObject();

    const { data, filename, filetype } = decodedDataObject;

    if (decodedDataObject?.filetype == FileType.CSV) {
      const csvResult = this.fileOps.jsonToCsv(data);
      this.fileOps.writeToDisk(filename, filetype, csvResult);
    }

    if (decodedDataObject?.filetype == FileType.XML) {
      const xmlResult = this.fileOps.jsonToXml(data);
      this.fileOps.writeToDisk(filename, filetype, xmlResult);
    }

    return decodedDataObject;
  }

  // async updateDataToFile(encryptedData: IEncryptedData) {
  //   const decryptedData = await this.crypto.decrypt(
  //     encryptedData,
  //     this.configService.get('secretKey'),
  //   );

  //   const decodedDataBytes = Buffer.from(decryptedData);
  //   const decodedData = FileProcessRequest.deserializeBinary(decodedDataBytes);
  //   const decodedDataObject = decodedData.toObject();

  //   const { data, filename, filetype } = decodedDataObject;
  // }
}
