import { join } from 'path';
import { mergeResolvers, loadFilesSync } from 'graphql-tools';

const resolversArray = loadFilesSync(join(__dirname, './'), { ignoreIndex: true });

export default mergeResolvers(resolversArray);
