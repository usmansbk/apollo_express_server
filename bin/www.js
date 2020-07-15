const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const app = require('../server');
const sequelize = require('../config/db');
const logger = require('../config/logger');
const schema = require('../graphql');

const PORT = process.env.PORT || 3000;

const server = new ApolloServer(schema);

app.listen(PORT, async () => {
  logger.log(`Serving at http://localhost:${PORT}/graphql for ${process.env.NODE_ENV}`);
  await sequelize.authenticate();
  await sequelize.sync({ force: true });
  logger.log('Connection to database established successfully');
});

server.applyMiddleware({ app });

module.exports = server;
