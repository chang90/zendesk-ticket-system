jest.mock('../src/readData');
jest.mock('../src/view');

import { MainMenuAction } from '../src/enum/MainMenuAction';
import { SearchType } from '../src/enum/SearchType';
import { main } from '../src/main';
import { readData } from '../src/readData';
import { getActionFromMainMenu, getSearchValue, getTypeFromSearchMenu, getValidTermFromSearchMenu, showResultTable, showSearchableFields } from '../src/view';

describe('main function', () => {
  test('close system if unable to read file', async () => {
    (readData as jest.Mock).mockReturnValue(Promise.resolve(null));

    const promise = main();
    await expect(promise).resolves.toEqual('System closed by error');
    expect(readData).toBeCalled();
  });

  test('able to call search function', async () => {
    const readResult = {
      [SearchType.User]: [{
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
      }],
      [SearchType.Organization]: [{
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
      }],
      [SearchType.Ticket]: [{
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
      }]
    };
    (readData as jest.Mock).mockReturnValue(Promise.resolve(readResult));
    (getActionFromMainMenu as jest.Mock).mockReturnValueOnce(Promise.resolve(MainMenuAction.Search)).mockReturnValue(Promise.resolve(MainMenuAction.Quit));
    (getTypeFromSearchMenu as jest.Mock).mockReturnValue(Promise.resolve(SearchType.User));
    (getValidTermFromSearchMenu as jest.Mock).mockReturnValue(Promise.resolve('_id'));
    (getSearchValue as jest.Mock).mockReturnValue(Promise.resolve('1'));

    const promise = main();
    await expect(promise).resolves.toEqual('System closed');
    expect(showResultTable).toBeCalled();
  });

  test('able to view searchable Fields list', async () => {
    const readResult = {
      [SearchType.User]: [{
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
      }],
      [SearchType.Organization]: [{
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
      }],
      [SearchType.Ticket]: [{
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
      }]
    };
    (readData as jest.Mock).mockReturnValue(Promise.resolve(readResult));
    (getActionFromMainMenu as jest.Mock).mockReturnValueOnce(Promise.resolve(MainMenuAction.ViewList)).mockReturnValue(Promise.resolve(MainMenuAction.Quit));

    const promise = main();
    await expect(promise).resolves.toEqual('System closed');
    expect(showSearchableFields).toBeCalled();
  });
});