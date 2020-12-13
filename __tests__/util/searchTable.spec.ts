import { SearchType } from '../../src/enum/SearchType';
import { FileData } from '../../src/interface/fileData';
import { searchTable } from '../../src/util/searchTable';

describe('searchTable function', () => {
  const filesInfo: { [key in SearchType]: Array<FileData> } = {
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
      {
        '_id': 38,
        'url': 'http://initech.zendesk.com/api/v2/users/38.json',
        'external_id': '72c7ba23-e070-4583-b701-04a038a28b02',
        'name': 'Elma Castro',
        'alias': 'Mr Georgette',
        'created_at': '2016-01-31T02:46:05 -11:00',
        'active': false,
        'verified': false,
        'shared': true,
        'locale': 'en-AU',
        'timezone': 'Gibraltar',
        'last_login_at': '2012-12-20T01:48:00 -11:00',
        'email': 'georgettecastro@flotonic.com',
        'phone': '8364-062-708',
        'signature': 'Don\'t Worry Be Happy!',
        'organization_id': 114,
        'tags': [
          'Colton',
          'Williamson',
          'Marshall',
          'Charco'
        ],
        'suspended': true,
        'role': 'agent'
      }
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
    {
      '_id': 119,
      'url': 'http://initech.zendesk.com/api/v2/organizations/119.json',
      'external_id': '2386db7c-5056-49c9-8dc4-46775e464cb7',
      'name': 'Multron',
      'domain_names': [
        'bleeko.com',
        'pulze.com',
        'xoggle.com',
        'sultraxin.com'
      ],
      'created_at': '2016-02-29T03:45:12 -11:00',
      'details': 'Non profit',
      'shared_tickets': false,
      'tags': [
        'Erickson',
        'Mccoy',
        'Wiggins',
        'Brooks'
      ]
    }
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
        'assignee_id': 1,
        'organization_id': 101,
        'tags': [
          'Ohio',
          'Pennsylvania',
          'American Samoa',
          'Northern Mariana Islands'
        ],
        'has_incidents': false,
        'due_at': '2016-07-31T02:37:50 -10:00',
        'via': 'web',

      }
    ]
  };

  test('Able to find and return user info if exist', () => {
    const searchConfig = {
      searchType: SearchType.User,
      searchTerm: 'tags',
      searchValue: 'Sutton'
    };

    const output = [{
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
      'organization_name': 'Multron',
      'tags': [
        'Springville',
        'Sutton',
        'Hartsville/Hartley',
        'Diaperville'
      ],
      'tickets': ['A Catastrophe in Korea (North)'],
      'suspended': true,
      'role': 'admin',

    }];
    expect(searchTable(filesInfo, searchConfig)).toEqual(output);
  });

  test('Able to find and return ticket info if exist', () => {
    const searchConfig = {
      searchType: SearchType.Ticket,
      searchTerm: '_id',
      searchValue: '436bf9b0-1147-4c0a-8439-6f79833bff5b'
    };

    const output = [{
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
      'via': 'web'
    }];
    expect(searchTable(filesInfo, searchConfig)).toEqual(output);
  });

  test('Return empty array if no element exist', () => {
    const output = [] as Array<FileData>;

    const searchConfig = {
      searchType: SearchType.User,
      searchTerm: 'tags',
      searchValue: 'Not exist'
    };
    expect(searchTable(filesInfo, searchConfig)).toEqual(output);
  });
});