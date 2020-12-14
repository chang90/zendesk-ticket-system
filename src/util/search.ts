import { FieldWithGroup } from '../enum/FieldWithGroup';
import { FieldWithRelationship } from '../enum/FieldWithRelationship';
import { SearchType } from '../enum/SearchType';
import { FileData } from '../interface/FileData';
import { SearchConfig } from '../interface/SearchConfig';
import { getIdNameMap } from './getIdNameMap';
import { getTicketAssigneeIdSubjectsMap } from './getTicketAssigneeIdSubjectsMap';
import { searchField } from './searchField';

export const search = (filesInfo: { [key in SearchType]: Array<FileData> }, searchConfig: SearchConfig): Array<FileData> | [] => {

  const organizationIdNameMap = filesInfo[SearchType.Organization] ? getIdNameMap(filesInfo[SearchType.Organization]) : {};
  const userIdNameMap = filesInfo[SearchType.User] ? getIdNameMap(filesInfo[SearchType.User]) : {};
  const ticketAssigneeIdSubjectsMap = filesInfo[SearchType.Ticket] ? getTicketAssigneeIdSubjectsMap(filesInfo[SearchType.Ticket]) : {};

  let result: Array<FileData> | [] = [];

  result = searchField(filesInfo, searchConfig);


  if (searchConfig?.searchType === SearchType.User) {
    result.map((fileData: FileData) => {
      const orgName = organizationIdNameMap[Number(fileData[FieldWithRelationship.OrganizationId])];
      if(orgName) {
        fileData[FieldWithRelationship.OrganizationName] = orgName;
      }
      const ticketList = ticketAssigneeIdSubjectsMap[fileData[FieldWithRelationship.Id] as number];
      if(ticketList?.length > 0) {
        fileData[FieldWithRelationship.Tickets] = ticketList;
      }
      return filesInfo;
    });

  } else if(searchConfig?.searchType === SearchType.Ticket) {
    result.map((fileData: FileData) => {
      const assigneeName = userIdNameMap[Number(fileData[FieldWithRelationship.AssigneeId])];
      if(assigneeName) {
        fileData[FieldWithRelationship.AssigneeName] = assigneeName;
      }

      const submitterName = userIdNameMap[Number(fileData[FieldWithRelationship.SubmitterId])];
      if(submitterName) {
        fileData[FieldWithRelationship.SubmitterName] = submitterName;
      }

      const orgName = organizationIdNameMap[Number(fileData[FieldWithRelationship.OrganizationId])];
      if(orgName) {
        fileData[FieldWithRelationship.OrganizationName] = orgName;
      }

      return filesInfo;
    });
  }
  return result;
};



