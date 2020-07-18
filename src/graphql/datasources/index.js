import UserAPI from './user';
import SessionAPI from './session';
import CsrfAPI from './csrf';
import store from '../../utils/store';
import jwt from '../../utils/jwt';

const {
  User,
  Session,
  Csrf,
} = store;

export default () => ({
  user: new UserAPI({ store: User }),
  session: new SessionAPI({ store: Session }),
  csrf: new CsrfAPI({ store: Csrf }),
  jwt,
});
