#! /usr/bin/env node
import { ApolloServer } from 'apollo-server-express';
import db from '../config/db';
import app from '../server';
import logger from '../config/logger';
import schema from '../graphql';

require('dotenv').config();

const PORT = process.env.PORT || 4000;

const server = new ApolloServer(schema);

app.listen(PORT, async () => {
  logger.log(`🚀 Serving at http://localhost:${PORT}/graphql for ${process.env.NODE_ENV}`);
  await db.init();
  logger.log('💾 Connection to database established successfully');
});

server.applyMiddleware({ app, cors: true });

export default server;
