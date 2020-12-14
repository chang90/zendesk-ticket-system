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

  const result = searchField(filesInfo, searchConfig);

  if (searchConfig?.searchType === SearchType.User) {
    return result.map((fileData: FileData) => {
      const orgName = organizationIdNameMap[Number(fileData[FieldWithRelationship.OrganizationId])];
      const fullFileData = {
        ...fileData
      };
      if (orgName) {
        fullFileData[FieldWithRelationship.OrganizationName] = orgName;
      }
      const ticketList = ticketAssigneeIdSubjectsMap[fileData[FieldWithRelationship.Id] as number];
      if (ticketList?.length > 0) {
        fullFileData[FieldWithRelationship.Tickets] = ticketList;
      }
      return fullFileData;
    });

  } else if (searchConfig?.searchType === SearchType.Ticket) {
    return result.map((fileData: FileData) => {
      const assigneeName = userIdNameMap[Number(fileData[FieldWithRelationship.AssigneeId])];
      const fullFileData = {
        ...fileData
      };
      if (assigneeName) {
        fullFileData[FieldWithRelationship.AssigneeName] = assigneeName;
      }

      const submitterName = userIdNameMap[Number(fileData[FieldWithRelationship.SubmitterId])];
      if (submitterName) {
        fullFileData[FieldWithRelationship.SubmitterName] = submitterName;
      }

      const orgName = organizationIdNameMap[Number(fileData[FieldWithRelationship.OrganizationId])];
      if (orgName) {
        fullFileData[FieldWithRelationship.OrganizationName] = orgName;
      }

      return fullFileData;
    });
  } else {
    return result;
  }
};



