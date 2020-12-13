import inquirer, { QuestionCollection } from 'inquirer';
import { MainMenuAction } from './enum/MainMenuAction';
import { SearchType } from './enum/SearchType';
import { FileData } from './interface/fileData';
import { SearchableFields } from './interface/SearchableFields';
import { isValidSearchTerm } from './util/isValidSearchTerm';

const getActionFromMainMenu = async (): Promise<MainMenuAction | null> => {
  const mainMenuQuestion: QuestionCollection<{ mainMenuAction: MainMenuAction | null }> = {
    type: 'list',
    name: 'mainMenuAction',
    message: 'Tell me what I can help you?',
    choices: [MainMenuAction.Search, MainMenuAction.ViewList, MainMenuAction.Quit]
  };
  const result = await inquirer.prompt(mainMenuQuestion);
  return result?.mainMenuAction ? result?.mainMenuAction as MainMenuAction : null;
};

const getTypeFromSearchMenu = async (): Promise<SearchType | null> => {
  const searchMenuQuestion: QuestionCollection<{ searchType: SearchType | null }> = {
    type: 'list',
    name: 'searchType',
    message: 'What do you want to search?',
    choices: [SearchType.User, SearchType.Ticket, SearchType.Organization]
  };
  const result = await inquirer.prompt(searchMenuQuestion);
  return result?.searchType ? result?.searchType as SearchType : null;
};

const getTermFromSearchMenu = async (): Promise<string | null> => {
  const searchUserMenuQuestion: QuestionCollection<{ term: string | null }> = {
    type: 'input',
    name: 'term',
    message: 'Which term do you want to search?'
  };

  const result = await inquirer.prompt(searchUserMenuQuestion);
  return result?.term ? result?.term : null;
};

const getValidTermFromSearchMenu = async(searchableFields: SearchableFields): Promise<string | null> => {
  let searchTerm = await getTermFromSearchMenu();
  let searchTermIsValid = isValidSearchTerm(searchTerm, searchableFields);

  let keepSearch = true;

  while(!searchTermIsValid && keepSearch) {
    console.log('Unable to find this term, please try another one');
    searchTerm = await getTermFromSearchMenu();
    searchTermIsValid = isValidSearchTerm(searchTerm, searchableFields);
  }
  return searchTerm;
};

const getSearchValue = async (): Promise<string | null> => {
  const searchValueQuestion: QuestionCollection<{ searchValue: string | null }> = {
    type: 'input',
    name: 'searchValue',
    message: 'Please enter search value:'
  };
  const result = await inquirer.prompt(searchValueQuestion);
  return result?.searchValue ? result?.searchValue : null;
};

const showSearchableFields = (searchableFieldsList: { [key in SearchType]: SearchableFields }) => {
  for (let searchableFields in searchableFieldsList) {
    console.log('-------------------------------------------------');
    console.log(`Search ${searchableFieldsList[searchableFields as SearchType].searchType} with`);
    searchableFieldsList[searchableFields as SearchType].fields.forEach((field) => {
      console.log(field);
    });
    console.log('\n');
  }
};

const showResultTable = (searchTableResult: Array<FileData>) => {
  searchTableResult.forEach((searchInfo) => {
    const displayResultMap: {[key: string]:string | number | boolean} = {};
    for (let key in searchInfo) {
      if (Array.isArray(searchInfo[key])) {
        (searchInfo[key] as Array<string>).forEach((item: string, index: number) => {
          displayResultMap[`${key}_${index}`] = item;
        });
      } else {
        displayResultMap[key] = searchInfo[key] as string | number | boolean;
      }
    }
    console.table(displayResultMap);
  });
};

export {
  getActionFromMainMenu, 
  getTypeFromSearchMenu,
  getTermFromSearchMenu,
  getValidTermFromSearchMenu,
  getSearchValue,
  showSearchableFields,
  showResultTable
};