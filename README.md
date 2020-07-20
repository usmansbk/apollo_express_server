# Apollo GraphQL express server boilerplate 

## Prerequisites
Install [Postgresql](https://docs.boundlessgeo.com/suite/1.1.1/index.html)
Set database username and password to postgres

## Setup Google
Follow this [instructions](https://www.npmjs.com/package/googleapis#oauth2-client) to setup google,
then download and rename the file to `client_secret.json`, then finally add it to project root directory.

## Installation

```
npm install
npm run db:create
npm run db:migrate
//Dont add passphrase
npm run key-gen
```

## Run in development
```
npm run dev
```

## Note
This project uses Sequelize ORM powered by PostgreSQL. 
Visit [here](https://sequelize.org/master) to see the documentation.