const path = require('path');
const { mergeTypeDefs, loadFilesSync } = require('graphql-tools');

const typesArray = loadFilesSync(path.join(__dirname, './'), { extensions: ['graphql'] });

module.exports = mergeTypeDefs(typesArray, { all: true });
