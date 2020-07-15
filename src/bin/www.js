import { ApolloServer } from 'apollo-server-express';
import { authenticate, sync } from '../config/db';
import { log } from '../config/logger';
import schema from '../../graphql';

require('dotenv').config();
const app = require('../server').default.default;

const PORT = process.env.PORT || 3000;

const server = new ApolloServer(schema);

app.listen(PORT, async () => {
  log(`Serving at http://localhost:${PORT}/graphql for ${process.env.NODE_ENV}`);
  await authenticate();
  await sync({ force: true });
  log('Connection to database established successfully');
});

server.applyMiddleware({ app });

export default server;
