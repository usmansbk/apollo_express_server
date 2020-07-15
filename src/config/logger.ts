import { createLogger } from 'bunyan';
import { name as _name } from '../../package.json';

const logger = createLogger({ name: _name });

function log(message) {
  logger.info(message);
}

function error(err) {
  logger.warn(err);
}

export {
  log,
  error,
};
