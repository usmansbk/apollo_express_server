const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'FML' });

function log(message) {
  logger.info(message);
}

function error(err) {
  logger.warn(err);
}

exports.log = log;
exports.error = error;
