import { FieldWithGroup } from '../enum/FieldWithGroup';
import { FieldWithRelationship } from '../enum/FieldWithRelationship';
import { SearchType } from '../enum/SearchType';
import { FileData } from '../interface/FileData';
import { SearchConfig } from '../interface/SearchConfig';
import { getOrganizationIdNameMap } from './getOrganizationIdNameMap';
import { getTicketAssigneeIdSubjectListMap } from './getTicketAssigneeIdSubjectListMap';
import { searchFieldWithArrayDataType } from './searchFieldWithArrayDataType';
import { searchFieldWithSimpleDataType } from './searchFieldWithSimpleDataType';

export const searchTable = (
  filesInfo: { [key in SearchType]: Array<FileData> },
  searchConfig: SearchConfig): Array<FileData> | [] => {
  const organizationIdNameMap = filesInfo[SearchType.Organization] ? getOrganizationIdNameMap(filesInfo[SearchType.Organization]) : {};
  const ticketAssigneeIdNameListMap = filesInfo[SearchType.Ticket] ? getTicketAssigneeIdSubjectListMap(filesInfo[SearchType.Ticket]) : {};

  let rawResult: Array<FileData> | [] = [];
  if (searchConfig?.searchTerm === FieldWithGroup.Tags || searchConfig?.searchTerm === FieldWithGroup.DomainNames) {
    rawResult = searchFieldWithArrayDataType(filesInfo, searchConfig);
  } else {
    rawResult = searchFieldWithSimpleDataType(filesInfo, searchConfig);
  }

  if (searchConfig?.searchType === SearchType.User) {
    rawResult.map((fileData: FileData) => {
      const orgName = organizationIdNameMap[Number(fileData[FieldWithRelationship.OrganizationId])];
      if(orgName) {
        fileData[FieldWithRelationship.OrganizationName] = orgName;
      }
      const ticketList = ticketAssigneeIdNameListMap[fileData[FieldWithRelationship.Id] as number];
      if(ticketList?.length > 0) {
        fileData[FieldWithRelationship.Tickets] = ticketList;
      }
      return filesInfo;
    });
  }
  return rawResult;
};



