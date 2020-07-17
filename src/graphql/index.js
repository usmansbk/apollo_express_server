import typeDefs from './types';
import resolvers from './resolvers';
import dataSources from './datasources';
import { formatError } from '../utils/errorHandler';
import jwt from '../utils/jwt';

export default {
  typeDefs,
  resolvers,
  mocks: false,
  formatError,
  dataSources,
  context: ({ req, res }) => ({
    me: jwt.verify(req, res),
  }),
};
