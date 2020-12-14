import { MainMenuAction } from './enum/MainMenuAction';
import { readData } from './readData';
import { getSearchableFieldsMap } from './util/getSearchableFieldsMap';
import { search } from './util/search';

import {
  getActionFromMainMenu,
  getSearchValue,
  getTypeFromSearchMenu,
  getValidTermFromSearchMenu,
  showResultTable,
  showSearchableFields
} from './view';

const main = async () => {
  let isRunning = true;

  const filesInfo = await readData();

  if (!filesInfo) {
    return;
  }

  const searchableFieldsMap = getSearchableFieldsMap(filesInfo);

  console.log('Hi, welcome to Zendesk Search');

  while (isRunning) {
    const mainMenuAction = await getActionFromMainMenu();

    switch (mainMenuAction) {

      case MainMenuAction.Search:
        const searchType = await getTypeFromSearchMenu();
        if (searchType) {

          const searchTerm = await getValidTermFromSearchMenu(searchableFieldsMap[searchType]);

          const searchValue = await getSearchValue();

          if (searchTerm && searchValue) {
            const searchConfig = {
              searchType,
              searchTerm,
              searchValue
            };
            const searchResult = search(filesInfo, searchConfig);
            if (searchResult?.length > 0) {
              showResultTable(searchResult);
            } else {
              console.log('No results found');
            }

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
        isRunning = false;
    }
  }
};
main();
