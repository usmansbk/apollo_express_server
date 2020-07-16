import { Sequelize } from 'sequelize';
import config from '../../db/config/config';

require('dotenv').config();

const { NODE_ENV } = process.env;

const db = config[NODE_ENV];

const init = async () => {
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
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  return sequelize;
};

export default {
  init,
};
