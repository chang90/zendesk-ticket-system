import { FileData } from './interface/fileData';
import * as fs from 'fs';

export const readData = async (fileName: string ): Promise<Array<FileData> | null> => {
  let fileContents;
  try {
    fileContents = await fs.readFileSync( __dirname + '\\data\\' + fileName, 'utf-8' );
    if(fileContents?.length > 0) {
      return JSON.parse(fileContents);
    } else {
      console.log(`file is empty: ${fileName}`);
      return null;
    }
  } catch (err) {
    console.log(`unable to read file: ${fileName}`);
    return null;
  }
};