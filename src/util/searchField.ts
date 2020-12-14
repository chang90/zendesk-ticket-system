import { SearchType } from '../enum/SearchType';
import { FileData } from '../interface/FileData';
import { SearchConfig } from '../interface/SearchConfig';

export const searchField = (
  filesInfo: { [key in SearchType]: Array<FileData> },
  searchConfig: SearchConfig) => {
  return filesInfo[searchConfig?.searchType].filter((fileData: FileData) => {
    if (Array.isArray(fileData[searchConfig?.searchTerm])) {
      return (fileData[searchConfig.searchTerm] as Array<string>).includes(searchConfig?.searchValue);
    } else {
      return fileData[searchConfig?.searchTerm]?.toString() === searchConfig?.searchValue;
    }
  });
};