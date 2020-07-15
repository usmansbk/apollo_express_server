# Fund My Laptop

## Prerequisites
Install [Postgresql](https://docs.boundlessgeo.com/suite/1.1.1/index.html)
Set database username and password to postgres

## Installation

```
npm install
npx sequelize db:create
```

## Run in development
```
npm run dev
```

## Note
This project uses Sequelize ORM powered by PostgreSQL. 
If you're familiar with MondoDB then you'll grab it easily
Visit [here](https://sequelize.org/master) to see the documentation.

### Do not add sensitive keys to the .env file. Contact maintainer to handle such data

## Status Codes
- 201 Created
- 200 Success with content
- 204 Success No content
- 400 Bad request. Server cannot process
- 403 Forbidden. Not authorized
