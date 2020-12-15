# zendesk-ticket-system
 
 A simple nodeJs based command line search tool that able to handle relationships between users, organizations, and tickets.

## Required
npm v6.14.6
node v12.18.3

## Technology being used
- NodeJs
- TypsScript
- Inquirer
- eslint
- Jest

## Get start
Go to project directory and run
```
npm i
```
to install node_modules

## Run in production mode
```
npm run start
```

## Build this project
```
npm run build
```

## lint checking
```
npm run lint
```

## Future plan

- There is a `requester_id` term in search ticket list, but I cannot find this keyword inside user / org / ticket json file. I'd better double-check about it.

- Improve test coverage.

- Make file path configerable when user run this project, for example:
```
npm run start ./data/user.json ./data/ticket.json ./data/organization.json
```

- Make this project as a package, and public it into npm.

## Problem solving
- This project is written in Windows env, check the `\` or `/` problem for file path, if you are a mac user.

readData.ts
```
fileContents = await fs.promises.readFile(__dirname + '\\data\\' + fileName, 'utf-8');
```