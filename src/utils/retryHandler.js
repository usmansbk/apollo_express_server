import retry from 'retry';
import logger from '../config/logger';

export default function faultTolerantResolve(cb) {
  const operation = retry.operation();

  operation.attempt((currentAttempt) => {
    cb().catch((err) => {
      if (operation.retry(err)) {
        logger.log(`Attempt#${currentAttempt} - ${err.message}`);
        logger.error(err);
        return;
      }
      logger.error(operation.mainError());
    });
  });
}
