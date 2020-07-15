import { createLogger } from 'bunyan';
import { name } from '../../package.json';

const logger = createLogger({ name });

function log(message: string) {
  logger.info(message);
}

function error(err: any) {
  logger.warn(err);
}

export {
  log,
  error,
};

export default logger;