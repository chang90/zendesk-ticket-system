import { FileData } from '../interface/FileData';

export const getOrganizationIdNameMap = (organizationInfoList: Array<FileData>) => {
  return organizationInfoList.reduce((map:{[key: number]:string}, organization: FileData) => {
    map[(organization['_id'] as number)] = organization['name'] as string;
    return map;
  },{});
};