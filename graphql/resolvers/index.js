const path = require('path');
const { mergeResolvers, loadFilesSync } = require('graphql-tools');

const resolversArray = loadFilesSync(path.join(__dirname, './'), { ignoreIndex: true });

module.exports = mergeResolvers(resolversArray);
