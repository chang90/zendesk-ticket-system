import { FieldWithRelationship } from '../enum/FieldWithRelationship';
import { FileData } from '../interface/FileData';

export const getIdNameMap = (fileDataList: Array<FileData>) => {
  return fileDataList.reduce((map:{[key: number]:string}, fileData: FileData) => {
    map[(fileData[FieldWithRelationship.Id] as number)] = fileData[FieldWithRelationship.Name] as string;
    return map;
  },{});
};