import { Sequelize } from 'sequelize';
import config from '../../db/config/config';

require('dotenv').config();

const { NODE_ENV } = process.env;

const {
  database,
  username,
  password,
  dialect,
  host,
  url,
} = config[NODE_ENV];

const init = async () => {
  let sequelize;
  if (NODE_ENV === 'production') {
    sequelize = new Sequelize(url, {
      dialect,
    });
  } else {
    sequelize = new Sequelize(database, username, password, {
      dialect,
      host,
    });
  }
  await sequelize.authenticate();
  await sequelize.sync({ force: true, match: /-dev$/ });
  return sequelize;
};

export default {
  init,
};
