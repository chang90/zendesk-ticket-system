import { SearchType } from '../enum/SearchType';
import { FileData } from '../interface/FileData';
import { SearchableFields } from '../interface/SearchableFields';

export const getSearchableFieldsMap = (filesInfo: { [key in SearchType]: Array<FileData> }): { [key in SearchType]: SearchableFields } => {
  const result: any = {};

  for (let fileType in filesInfo) {
    // Use the first element inside file array to analysis the fields
    const singleElement = (filesInfo[fileType as SearchType] as Array<FileData>)[0];
    const newSearchableField: SearchableFields = {
      searchType: fileType as SearchType,
      fields: Object.keys(singleElement)
    };
    result[fileType as SearchType] = newSearchableField;
  }
  return result;
};