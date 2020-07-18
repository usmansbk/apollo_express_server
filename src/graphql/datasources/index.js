import UserAPI from './user';
import SessionAPI from './session';
import store from '../../utils/store';
import jwt from '../../utils/jwt';

const {
  User,
  Session,
} = store;

export default () => ({
  user: new UserAPI({ store: User }),
  session: new SessionAPI({ store: Session }),
  jwt,
});
