import { MainMenuAction } from './enum/MainMenuAction';
import { SearchType } from './enum/SearchType';
import { FileData } from './interface/fileData';
import { SearchableFields } from './interface/SearchableFields';
import { readData } from './readData';
import { getSearchableFieldsMap } from './util/getSearchableFieldsMap';

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



const main = async () => {
  let isRunning = true;
  const inputData:{ [key in SearchType]: string } = {
    [SearchType.User]: 'users.json',
    [SearchType.Organization]: 'organizations.json',
    [SearchType.Ticket]: 'users.json',
  };

  
  const usersInfo = await readData(inputData[SearchType.User]);
  const orgsInfo = await readData(inputData[SearchType.Organization]);
  const ticketsInfo = await readData(inputData[SearchType.Ticket]);

  let searchableFieldsList: {[key in SearchType]:SearchableFields};

  if(usersInfo && orgsInfo && ticketsInfo) {
    const filesInfo = {
      [SearchType.User]: usersInfo as Array<FileData>,
      [SearchType.Organization]: orgsInfo,
      [SearchType.Ticket]: ticketsInfo,
    };
    searchableFieldsList = getSearchableFieldsMap(filesInfo);
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
        showSearchableFields(searchableFieldsList);
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
