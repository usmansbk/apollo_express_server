require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'boilerplate-dev',
    host: 'localhost',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'postgres',
    database: 'boilerplate-test',
    host: 'localhost',
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    username: 'postgres',
    password: 'postgres',
    database: 'boilerplate-prod',
    host: 'localhost',
    dialect: 'postgres',
  },
};
