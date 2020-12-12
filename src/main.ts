import { MainMenuAction } from './enum/MainMenuAction';
import { SearchType } from './enum/SearchType';

import {
  getActionFromMainMenu,
  getSearchValue, 
  getTermFromSearchMenu, 
  getTypeFromSearchMenu
} from './view';

const searchTable = (searchType: SearchType, searchTerm: string, searchValue: string) => {
  console.log('search table', searchType, searchTerm, searchValue);
 return {};
};

const main = async () => {
  let isRunning = true;

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
        console.log('viewList');
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
