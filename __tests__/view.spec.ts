import { SearchType } from '../src/enum/SearchType';
import { showSearchableFields } from '../src/view';

describe('getSearchableFieldsMap function', () => {
  test('Able to display SearchableFieldsList title', async () => {
    const input = {
      Users: {
        searchType: SearchType.User,
        fields: [
          '_id',
          'url'
        ]
      },
      Organization: {
        searchType: SearchType.Organization,
        fields: [
          '_id',
          'url'
        ]
      },
      Tickets: {
        searchType: SearchType.Ticket,
        fields: [
          '_id',
          'url'
        ]
      }
    };
    console.log = jest.fn();
    showSearchableFields(input);

    expect(console.log).toHaveBeenCalledWith('Search Users with');
    expect(console.log).toHaveBeenCalledWith('_id');
  });

  test('Able to display SearchableFieldsList\'s field', async () => {
    const input = {
      Users: {
        searchType: SearchType.User,
        fields: [
          '_id',
          'url'
        ]
      },
      Organization: {
        searchType: SearchType.Organization,
        fields: [
          '_id',
          'url'
        ]
      },
      Tickets: {
        searchType: SearchType.Ticket,
        fields: [
          '_id',
          'url'
        ]
      }
    };
    console.log = jest.fn();
    showSearchableFields(input);

    expect(console.log).toHaveBeenCalledWith('_id');
  });
});