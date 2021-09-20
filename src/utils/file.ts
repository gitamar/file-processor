import { Parser } from 'json2csv';
import jsontoxml = require('jsontoxml');
import { readFileSync, writeFileSync, existsSync } from 'fs';

export class FileOps {
  public jsonToCsv(data: string) {
    const flattendData = this.flatten(JSON.parse(data));
    const fields = Object.keys(flattendData);
    const opts = { fields };
    const parser = new Parser(opts);
    return parser.parse(flattendData);
  }

  public jsonToXml(data: unknown) {
    return jsontoxml(data);
  }

  public writeToDisk(fileName: string, fileExtention: string, data: any) {
    writeFileSync(`./public/${fileName}.${fileExtention}`, data, {
      encoding: 'utf8',
      flag: 'w',
    });
    return `${fileName}.${fileExtention}`;
  }

  public readFromDisk(fileName: string) {
    return readFileSync(`./public/${fileName}`, { encoding: 'utf-8' });
  }

  private flatten(data) {
    const result = {};
    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        // eslint-disable-next-line no-var
        for (var i = 0, l = cur.length; i < l; i++)
          recurse(cur[i], prop + '[' + i + ']');
        if (l == 0) result[prop] = [];
      } else {
        let isEmpty = true;
        for (const p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + '.' + p : p);
        }
        if (isEmpty && prop) result[prop] = {};
      }
    }
    recurse(data, '');
    return result;
  }

  private isFileExist(fileName: string) {
    if (existsSync(`${fileName}`)) {
    }
  }
}
