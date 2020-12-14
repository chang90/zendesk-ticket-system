import { FileData } from '../interface/fileData';

export const getTicketAssigneeIdSubjectsMap = (TicketList: Array<FileData>): {[key: string]: Array<string>} => {
  return TicketList.reduce((map:{[key: string]:Array<string>}, ticket: FileData) => {
    if(ticket['assignee_id'] && !map[(ticket['assignee_id'].toString())]) {
      map[(ticket['assignee_id'].toString())] = [ticket['subject'] as string];
    } else if (ticket['assignee_id']) {
      map[(ticket['assignee_id'].toString())].push(ticket['subject'] as string);
    }
    return map;
  },{});
};
