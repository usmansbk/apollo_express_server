import { User as Controller } from '../../controllers';

export default {
  Query: {
    user: Controller.getUserById,
    me: Controller.me,
  },
  User: {
    email: Controller.email,
  },
};
