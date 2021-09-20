import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { IEncryptedData } from 'src/file-processor/interface';

export class Crypto {
  async encrypt(dataToEncrypt: string, key: string) {
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(dataToEncrypt);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
  }

  async decrypt(dataToDecrypt: IEncryptedData, key: string) {
    const iv = Buffer.from(dataToDecrypt.iv, 'hex');
    const encryptedText = Buffer.from(dataToDecrypt.encryptedData, 'hex');
    const decipher = createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
  }
}
