import { Sequelize } from 'sequelize';
import config from '../../db/config/config';

require('dotenv').config();

const { NODE_ENV } = process.env;

const db = config[NODE_ENV];

const init = () => {
  if (NODE_ENV === 'production') {
    return new Sequelize(db.url, {
      dialect: db.dialect,
    });
  }
  return new Sequelize(db.database, db.username, db.password, {
    dialect: db.dialect,
    host: db.host,
  });
};

export default init();
