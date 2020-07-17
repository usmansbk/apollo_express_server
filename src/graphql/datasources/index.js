import UserAPI from './user';
import store from '../../utils/store';
import jwt from '../../utils/jwt';

const {
  User,
} = store;

export default () => ({
  user: new UserAPI({ store: User }),
  jwt,
});
