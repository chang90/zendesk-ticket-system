import * as fs from 'fs';
import { FileData } from './interface/fileData';
import { SearchType } from './enum/SearchType';

const USER_FILE_NAME = 'users.json';
const ORGNAZATION_FILE_NAME = 'organizations.json';
const TICKET_FILE_NAME = 'tickets.json';

export const readSingleFile = async (fileName: string): Promise<Array<FileData> | null> => {
  let fileContents;
  try {
    fileContents = await fs.promises.readFile(__dirname + '\\data\\' + fileName, 'utf-8');
    if (fileContents?.length > 0) {
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

export const readData = async (): Promise<{ [key in SearchType]: Array<FileData> } | null> => {
  const [usersInfo, orgsInfo, ticketsInfo] = await Promise.all([readSingleFile(USER_FILE_NAME), readSingleFile(ORGNAZATION_FILE_NAME), readSingleFile(TICKET_FILE_NAME)]);

  if (usersInfo && orgsInfo && ticketsInfo) {
    return {
      [SearchType.User]: usersInfo,
      [SearchType.Organization]: orgsInfo,
      [SearchType.Ticket]: ticketsInfo,
    };

  } else {
    console.log('Some files are missing, please check the file name.');
    return null;
  }
};