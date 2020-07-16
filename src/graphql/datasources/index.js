import UserAPI from './user';
import store from '../../utils/store';

const {
  User,
} = store;

export default () => ({
  user: new UserAPI({ store: User }),
});
