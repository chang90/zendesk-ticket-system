import { SearchType } from '../../src/enum/SearchType';
import { FileData } from '../../src/interface/fileData';
import { getSearchableFieldsMap } from '../../src/util/getSearchableFieldsMap';

describe('getSearchableFieldsMap function', () => {
  test('Able to generate SearchableFieldsList object when data is valid', async () => {
    const input: {[key in SearchType]: Array<FileData>} = {
      Users: [
        {
          '_id': 1,
          'url': 'http://initech.zendesk.com/api/v2/users/1.json',
          'external_id': '74341f74-9c79-49d5-9611-87ef9b6eb75f',
          'name': 'Francisca Rasmussen',
          'alias': 'Miss Coffey',
          'created_at': '2016-04-15T05:19:46 -10:00',
          'active': true,
          'verified': true,
          'shared': false,
          'locale': 'en-AU',
          'timezone': 'Sri Lanka',
          'last_login_at': '2013-08-04T01:03:27 -10:00',
          'email': 'coffeyrasmussen@flotonic.com',
          'phone': '8335-422-718',
          'signature': 'Don\'t Worry Be Happy!',
          'organization_id': 119,
          'tags': [
            'Springville',
            'Sutton',
            'Hartsville/Hartley',
            'Diaperville'
          ],
          'suspended': true,
          'role': 'admin'
        },
      ],
      Organization: [{
        '_id': 101,
        'url': 'http://initech.zendesk.com/api/v2/organizations/101.json',
        'external_id': '9270ed79-35eb-4a38-a46f-35725197ea8d',
        'name': 'Enthaze',
        'domain_names': [
          'kage.com',
          'ecratic.com',
          'endipin.com',
          'zentix.com'
        ],
        'created_at': '2016-05-21T11:10:28 -10:00',
        'details': 'MegaCorp',
        'shared_tickets': false,
        'tags': [
          'Fulton',
          'West',
          'Rodriguez',
          'Farley'
        ]
      },
      ],
      Tickets: [
        {
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
          'assignee_id': 24,
          'organization_id': 116,
          'tags': [
            'Ohio',
            'Pennsylvania',
            'American Samoa',
            'Northern Mariana Islands'
          ],
          'has_incidents': false,
          'due_at': '2016-07-31T02:37:50 -10:00',
          'via': 'web'
        }
      ]
    };
    const output = {
      Users: {
        searchType: 'Users',
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
      },
      Organization: {
        searchType: 'Organization',
        fields: [
          '_id',
          'url',
          'external_id',
          'name',
          'domain_names',
          'created_at',
          'details',
          'shared_tickets',
          'tags'
        ]
      },
      Tickets: {
        searchType: 'Tickets',
        fields: [
          '_id',
          'url',
          'external_id',
          'created_at',
          'type',
          'subject',
          'description',
          'priority',
          'status',
          'submitter_id',
          'assignee_id',
          'organization_id',
          'tags',
          'has_incidents',
          'due_at',
          'via'
        ]
      }
    };
    expect(getSearchableFieldsMap(input)).toEqual(output);
  });
});