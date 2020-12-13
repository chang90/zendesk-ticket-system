import { FieldWithGroup } from '../enum/FieldWithGroup';
import { FieldWithRelationship } from '../enum/FieldWithRelationship';
import { SearchType } from '../enum/SearchType';
import { FileData } from '../interface/FileData';
import { SearchConfig } from '../interface/SearchConfig';
import { getOrganizationIdNameMap } from './getOrganizationIdNameMap';
import { searchFieldWithArrayDataType } from './searchFieldWithArrayDataType';
import { searchFieldWithSimpleDataType } from './searchFieldWithSimpleDataType';

export const searchTable = (
  filesInfo: { [key in SearchType]: Array<FileData> },
  searchConfig: SearchConfig): Array<FileData> | [] => {
  const organizationIdNameMap = filesInfo[SearchType.Organization]? getOrganizationIdNameMap(filesInfo[SearchType.Organization]) : {};
  
  let rawResult: Array<FileData> | [] = [];
  if (searchConfig?.searchTerm === FieldWithGroup.Tags || searchConfig?.searchTerm === FieldWithGroup.DomainNames) {
    rawResult = searchFieldWithArrayDataType(filesInfo, searchConfig);
  } else {
    rawResult = searchFieldWithSimpleDataType(filesInfo, searchConfig);
  }

  if (searchConfig?.searchType === SearchType.User) {
    rawResult.map((fileData: FileData) => {
      const orgName = organizationIdNameMap[Number(fileData[FieldWithRelationship.OrganizationId])];
      fileData[FieldWithRelationship.OrganizationName] = orgName;
      return filesInfo;
    });
  }
  return rawResult;
};



