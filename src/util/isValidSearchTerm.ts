import { SearchableFields } from '../interface/SearchableFields';

export const isValidSearchTerm = (searchTerm: string | null, searchableFields: SearchableFields): boolean => {
  if(searchTerm && searchableFields?.fields?.length > 0) {
    return searchableFields.fields.includes(searchTerm);
  } else {
    return false;
  }
};
