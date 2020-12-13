import { MainMenuAction } from './enum/MainMenuAction';
import { SearchType } from './enum/SearchType';
import { SearchableFields } from './interface/SearchableFields';
import { readData } from './readData';
import { getSearchableFieldsMap } from './util/getSearchableFieldsMap';
import { searchTable } from './util/searchTable';

import {
  getActionFromMainMenu,
  getSearchValue,
  getTypeFromSearchMenu,
  getValidTermFromSearchMenu,
  showSearchableFields
} from './view';

const main = async () => {
  let isRunning = true;
  const inputData: { [key in SearchType]: string } = {
    [SearchType.User]: 'users.json',
    [SearchType.Organization]: 'organizations.json',
    [SearchType.Ticket]: 'tickets.json',
  };

  const usersInfo = await readData(inputData[SearchType.User]);
  const orgsInfo = await readData(inputData[SearchType.Organization]);
  const ticketsInfo = await readData(inputData[SearchType.Ticket]);

  let searchableFieldsMap: { [key in SearchType]: SearchableFields };
  let filesInfo = null;

  if (usersInfo && orgsInfo && ticketsInfo) {
    filesInfo = {
      [SearchType.User]: usersInfo,
      [SearchType.Organization]: orgsInfo,
      [SearchType.Ticket]: ticketsInfo,
    };
    searchableFieldsMap = getSearchableFieldsMap(filesInfo);
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
        if (searchType) {

          let searchTerm = await getValidTermFromSearchMenu(searchableFieldsMap[searchType]);

          const searchValue = await getSearchValue();

          if (searchTerm && searchValue) {
            const searchConfig = {
              searchType,
              searchTerm,
              searchValue
            };
            const searchResult = searchTable(filesInfo, searchConfig);
            console.log(searchResult);
          } else {
            console.log('Unable to get Term or value');
          }
        } else {
          console.log('Do not have this search type');
        }
        break;

      case MainMenuAction.ViewList:
        showSearchableFields(searchableFieldsMap);
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
