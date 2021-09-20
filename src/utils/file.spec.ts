import { FileOps } from './file';
import { readFileSync, writeFileSync } from 'fs';
jest.mock('fs');
describe('Testing if FileOps Class and Methods are defined', () => {
  let fileOps: FileOps;
  beforeEach(async () => {
    fileOps = new FileOps();
  });

  it('should be defined - Object fileOps', () => {
    expect(fileOps).toBeDefined();
  });

  it('should be defined - method jsonToCsv', () => {
    expect(fileOps.jsonToCsv).toBeDefined();
  });

  it('should be defined - method jsonToXml', () => {
    expect(fileOps.jsonToXml).toBeDefined();
  });

  it('should be defined - method writeToDisk', () => {
    expect(fileOps.writeToDisk).toBeDefined();
  });

  it('should be defined - method readFromDisk', () => {
    expect(fileOps.readFromDisk).toBeDefined();
  });
});

describe('Testing if json to csv conversion method works', () => {
  let fileOps: FileOps;
  const mockJsonData: string = JSON.stringify({ hello: 'world' });
  const mockNestedJsonData: string = JSON.stringify({
    hello: 'world',
    underWorld: { level: 1, rate: 2 },
  });
  const mockCsvData: unknown = `"hello"\n"world"`;
  const mockFlatendCsvData = `"hello","underWorld.level","underWorld.rate"\n"world\",1,2`;
  beforeEach(async () => {
    fileOps = new FileOps();
  });

  it('should convert a json data into a csv data', () => {
    jest.spyOn(fileOps, 'jsonToCsv');
    const convertedCsvData = fileOps.jsonToCsv(mockJsonData);
    expect(fileOps.jsonToCsv).toBeCalled();
    expect(convertedCsvData).toBe(mockCsvData);
  });

  it('should convert a nestd json data into a flat csv data', () => {
    jest.spyOn(fileOps, 'jsonToCsv');
    const convertedCsvData = fileOps.jsonToCsv(mockNestedJsonData);
    expect(fileOps.jsonToCsv).toBeCalled();
    expect(convertedCsvData).toBe(mockFlatendCsvData);
  });
});

describe('Testing if json to xml conversion method works', () => {
  let fileOps: FileOps;
  const mockJsonData: Record<string, any> = { hello: 'world' };
  const mockNestedJsonData: Record<string, any> = {
    hello: 'world',
    underWorld: { level: 1, rate: 2 },
  };
  const mockXmlData = '<hello>world</hello>';
  const mockNestedXmlData =
    '<hello>world</hello><underWorld><level>1</level><rate>2</rate></underWorld>';

  beforeEach(async () => {
    fileOps = new FileOps();
  });

  it('should convert json data into a xml data', () => {
    jest.spyOn(fileOps, 'jsonToXml');
    const convertedXmlData = fileOps.jsonToXml(mockJsonData);
    expect(fileOps.jsonToXml).toBeCalled();
    expect(convertedXmlData).toBe(mockXmlData);
  });

  it('should convert a nestd json data into a flat csv data', () => {
    jest.spyOn(fileOps, 'jsonToXml');
    const convertedXmlData = fileOps.jsonToXml(mockNestedJsonData);
    expect(fileOps.jsonToXml).toBeCalled();
    expect(convertedXmlData).toBe(mockNestedXmlData);
  });
});

describe('Testing write data to file in disk method works', () => {
  let fileOps: FileOps;
  const fileName = 'testFile12345';
  const fileExtention = 'xml';
  const mockNestedXmlData =
    '<hello>world</hello><underWorld><level>1</level><rate>2</rate></underWorld>';

  beforeEach(async () => {
    fileOps = new FileOps();
  });

  it('should check the mock functions', () => {
    expect(jest.isMockFunction(writeFileSync)).toBeTruthy();
  });

  it('should write the data content to a file in disk', () => {
    const fsWriteResponse = fileOps.writeToDisk(
      fileName,
      fileExtention,
      mockNestedXmlData,
    );

    expect(fsWriteResponse).toBeDefined();
    expect(fsWriteResponse).toBe('testFile12345.xml');
  });
});

describe('Testing read data from file in disk method works', () => {
  let fileOps: FileOps;
  const fileName = 'testFile1234';
  const fileExtention = 'xml';
  const mockNestedXmlData =
    '<hello>world</hello><underWorld><level>1</level><rate>2</rate></underWorld>';

  beforeEach(async () => {
    fileOps = new FileOps();
  });

  it('should check the mock functions', () => {
    expect(jest.isMockFunction(readFileSync)).toBeTruthy();
  });

  it('should read the data content from a file in disk', () => {
    jest.spyOn(fileOps, 'readFromDisk').mockReturnValueOnce(mockNestedXmlData);
    const fsReadResponse = fileOps.readFromDisk(`${fileName}.${fileExtention}`);

    expect(fsReadResponse).toBeDefined();
    expect(fsReadResponse).toBe(mockNestedXmlData);
  });
});
