const bunyan = require('bunyan');
const json = require('../package.json');

const logger = bunyan.createLogger({ name: json.name });

function log(message) {
  logger.info(message);
}

function error(err) {
  logger.warn(err);
}

exports.log = log;
exports.error = error;
