import typeDefs from './types';
import resolvers from './resolvers';
import dataSources from './datasources';
import { formatError } from '../utils/errorHandler';

export default {
  typeDefs,
  resolvers,
  formatError,
  dataSources,
  context: ({ req }) => ({
    me: req.headers?.authorization || { id: 'usman' },
  }),
};
