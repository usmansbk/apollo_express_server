const { Sequelize } = require('sequelize');
const config = require('../db/config/config');
require('dotenv').config();

const { NODE_ENV } = process.env;

const db = config[NODE_ENV];

let sequelize;

if (NODE_ENV === 'production') {
  sequelize = new Sequelize(db.url, {
    dialect: db.dialect,
  });
} else {
  sequelize = new Sequelize(db.database, db.username, db.password, {
    dialect: db.dialect,
    host: db.host,
  });
}

module.exports = sequelize;
