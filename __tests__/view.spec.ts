import { SearchType } from '../src/enum/SearchType';
import { showResultTable, showSearchableFields } from '../src/view';

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

describe('showResultTable function', () => {
  test('Able to display result table', async () => {
    const input = [{
      '_id': '436bf9b0-1147-4c0a-8439-6f79833bff5b',
      'url': 'http://initech.zendesk.com/api/v2/tickets/436bf9b0-1147-4c0a-8439-6f79833bff5b.json',
      'external_id': '9210cdc9-4bee-485f-a078-35396cd74063',
      'created_at': '2016-04-28T11:19:34 -10:00',
      'type': 'incident',
      'subject': 'A Catastrophe in Korea (North)',
      'description': 'Nostrud ad sit velit cupidatat laboris ipsum nisi amet laboris ex exercitation amet et proident. Ipsum fugiat aute dolore tempor nostrud velit ipsum.',
      'priority': 'high',
      'status': 'pending',
      'submitter_id': 38,
      'submitter_name': 'Elma Castro',
      'assignee_id': 1,
      'assignee_name': 'Francisca Rasmussen',
      'organization_id': 101,
      'organization_name': 'Enthaze',
      'tags': [
        'Ohio',
        'Pennsylvania',
        'American Samoa',
        'Northern Mariana Islands'
      ],
      'has_incidents': false,
      'due_at': '2016-07-31T02:37:50 -10:00',
      'via': 'web',
      
    }];
    const tableData = {
      '_id': '436bf9b0-1147-4c0a-8439-6f79833bff5b',
      'url': 'http://initech.zendesk.com/api/v2/tickets/436bf9b0-1147-4c0a-8439-6f79833bff5b.json',
      'external_id': '9210cdc9-4bee-485f-a078-35396cd74063',
      'created_at': '2016-04-28T11:19:34 -10:00',
      'type': 'incident',
      'subject': 'A Catastrophe in Korea (North)',
      'description': 'Nostrud ad sit velit cupidatat laboris ipsum nisi amet laboris ex exercitation amet et proident. Ipsum fugiat aute dolore tempor nostrud velit ipsum.',
      'priority': 'high',
      'status': 'pending',
      'submitter_id': 38,
      'submitter_name': 'Elma Castro',
      'assignee_id': 1,
      'assignee_name': 'Francisca Rasmussen',
      'organization_id': 101,
      'organization_name': 'Enthaze',
      'tags_0':'Ohio',
      'tags_1':'Pennsylvania',
      'tags_2':'American Samoa',
      'tags_3':'Northern Mariana Islands',
      'has_incidents': false,
      'due_at': '2016-07-31T02:37:50 -10:00',
      'via': 'web',
    };

    console.table = jest.fn();
    showResultTable(input);

    expect(console.table).toHaveBeenCalledWith(tableData);
  });
});