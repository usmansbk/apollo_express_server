import UserAPI from './user';
import { User } from '../../../db';

export default () => ({
  user: new UserAPI({ store: User }),
});
