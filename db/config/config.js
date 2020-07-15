require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'fundmylaptop',
    host: 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'fundmylaptop-test',
    host: 'localhost',
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
