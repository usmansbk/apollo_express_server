/* eslint-disable no-console */
import { createLogger } from 'bunyan';
import { name } from '../../package.json';

const logger = createLogger({ name });

function log(message) {
  logger.info(message);
}

function error(err) {
  logger.warn(err);
}

function debug(...args) {
  console.log(...args);
}

export default {
  log,
  error,
  debug,
};
