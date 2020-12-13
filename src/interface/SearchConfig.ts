import { SearchType } from '../enum/SearchType';

export interface SearchConfig {
  searchType: SearchType,
  searchTerm: string,
  searchValue: string
}