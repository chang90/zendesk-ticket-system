import { SearchType } from '../enum/SearchType';

export interface SearchableFields {
  searchType: SearchType,
  fields: Array<string>
}