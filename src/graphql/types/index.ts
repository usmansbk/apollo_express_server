import { join } from 'path';
import { mergeTypeDefs, loadFilesSync } from 'graphql-tools';

const typesArray = loadFilesSync(join(__dirname, './'), { extensions: ['graphql'] });

export default mergeTypeDefs(typesArray);
