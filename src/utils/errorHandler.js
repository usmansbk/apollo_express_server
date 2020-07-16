import { AuthenticationError, ApolloError } from 'apollo-server-express';
import logger from '../config/logger';

export function formatError(err) {
  if (process.env.NODE_ENV === 'production') {
    if (err.message.toLowerCase().includes('sequelize')) {
      return new ApolloError('Internal server error', 'SERVER');
    }

    if (err.message.toLowerCase().includes('cannot query field')) {
      return new ApolloError('Cannot query fileds', 'BAD_REQUEST');
    }

    if (err.originalError instanceof AuthenticationError) {
      return new ApolloError('Make sure you are signed in.', 'UNAUTHENTICATED');
    }
  }

  logger.log(err);

  return err;
}

export default {
  formatError,
};
