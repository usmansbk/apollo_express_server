import retry from 'retry';
import logger from '../config/logger';

export default function faultTolerantResolve(cb) {
  const operation = retry.operation();

  operation.attempt(async (currentAttempt) => {
    try {
      console.log('CURRENT', currentAttempt);
      await cb();
    } catch (error) {
      logger.error(operation.mainError());
    }
  });
}
