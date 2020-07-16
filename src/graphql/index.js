import typeDefs from './types';
import resolvers from './resolvers';
import db from '../../db';

export default {
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    me: req.headers?.authorization || { id: 'usman' },
    db,
  }),
};
