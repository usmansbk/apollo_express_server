import typeDefs from './types';
import resolvers from './resolvers';
import dataSources from './datasources';

export default {
  typeDefs,
  resolvers,
  dataSources,
  context: ({ req }) => ({
    me: req.headers?.authorization || { id: 'usman' },
  }),
};
