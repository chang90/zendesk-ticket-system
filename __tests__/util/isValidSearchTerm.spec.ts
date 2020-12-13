import { SearchType } from '../../src/enum/SearchType';
import { isValidSearchTerm } from '../../src/util/isValidSearchTerm';

describe('isValidSearchTerm function', () => {
  test('Able to return true when search term is valid', async () => {
    const searchableFields = {
      searchType: SearchType.User,
      fields: [
        '_id',
        'url',
        'external_id',
        'name',
        'alias',
        'created_at',
        'active',
        'verified',
        'shared',
        'locale',
        'timezone',
        'last_login_at',
        'email',
        'phone',
        'signature',
        'organization_id',
        'tags',
        'suspended',
        'role'
      ]
    };
    expect(isValidSearchTerm('_id', searchableFields)).toEqual(true);
  });

  test('Able to return false when search term cannot be find', async () => {
    const searchableFields = {
      searchType: SearchType.User,
      fields: [
        '_id',
        'url',
        'external_id',
        'name',
        'alias',
        'created_at',
        'active',
        'verified',
        'shared',
        'locale',
        'timezone',
        'last_login_at',
        'email',
        'phone',
        'signature',
        'organization_id',
        'tags',
        'suspended',
        'role'
      ]
    };
    expect(isValidSearchTerm('new_item', searchableFields)).toEqual(false);
  });
});