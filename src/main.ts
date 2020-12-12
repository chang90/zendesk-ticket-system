import { MainMenuAction } from './enum/MainMenuAction';
import { SearchType } from './enum/SearchType';
import { FileData } from './interface/fileData';
import { SearchableFields } from './interface/SearchableFields';

import {
  getActionFromMainMenu,
  getSearchValue, 
  getTermFromSearchMenu, 
  getTypeFromSearchMenu,
  showSearchableFields
} from './view';

const searchTable = (searchType: SearchType, searchTerm: string, searchValue: string) => {
  console.log('search table', searchType, searchTerm, searchValue);
 return {};
};

const getSearchableFieldsList = (filesInfo: {[key in SearchType]: Array<FileData>} ): Array<SearchableFields> => {
  console.log('getSearchableField');
  const userSearchableFields: SearchableFields = {
    searchType: SearchType.User,
    fields: ['_id']
   };
 return [userSearchableFields];
};

const readData = (fileDirection: string ): Array<FileData> => {
  return [  {
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
  }];
};


const main = async () => {
  let isRunning = true;
  const inputData:{ [key in SearchType]: string } = {
    [SearchType.User]: '../data/users.json',
    [SearchType.Organization]: '../data/organizations.json',
    [SearchType.Ticket]: '../data/users.json',
  };

  
  const usersInfo = readData(inputData[SearchType.User]);
  const orgsInfo = readData(inputData[SearchType.Organization]);
  const ticketsInfo = readData(inputData[SearchType.Ticket]);

  let searchableFieldsList: Array<SearchableFields> = [];

  if(usersInfo && orgsInfo && ticketsInfo) {
    const filesInfo = {
      [SearchType.User]: usersInfo,
      [SearchType.Organization]: orgsInfo,
      [SearchType.Ticket]: ticketsInfo,
    };
    searchableFieldsList = getSearchableFieldsList(filesInfo);
  } else {
    console.log('Error: Some tables are missing, please update inputData config');
    return;
  }
  
  console.log('Hi, welcome to Zendesk Search');

  while (isRunning) {
    const mainMenuAction = await getActionFromMainMenu();

    switch (mainMenuAction) {

      case MainMenuAction.Search:
        const searchType = await getTypeFromSearchMenu();
        if(searchType) {
          const searchTerm = await getTermFromSearchMenu();
          const searchValue = await getSearchValue();

          if(searchTerm && searchValue) {
            searchTable(searchType, searchTerm, searchValue);
          } else {
            console.log('Unable to get Term or value');
          }
        } else {
          console.log('Do not have this search type');
        }
        break;

      case MainMenuAction.ViewList:
        
        if(searchableFieldsList.length > 0) {
          showSearchableFields(searchableFieldsList);
        } else {
          console.log('No field able to search');
        }
        break;

      case MainMenuAction.Quit:
        isRunning = false;
        break;

      default:
        console.log('Something went wrong...');
    }
  }
};
main();
