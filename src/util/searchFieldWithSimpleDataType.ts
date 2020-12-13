import { SearchType } from '../enum/SearchType';
import { FileData } from '../interface/FileData';
import { SearchConfig } from '../interface/SearchConfig';

export const searchFieldWithSimpleDataType = (
  filesInfo: { [key in SearchType]: Array<FileData> },
  searchConfig: SearchConfig) => {
    return filesInfo[searchConfig?.searchType].filter((fileData: FileData) => 
    fileData[searchConfig?.searchTerm]?.toString() === searchConfig?.searchValue);
};