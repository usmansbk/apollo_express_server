import { Auth, Admin } from '../../controllers';

export default {
  Mutation: {
    // Admin mutations
    sudo: Auth.sudo,
    createUser: Admin.createUser,
    updateUser: Admin.updateUser,
    deleteUser: Admin.deleteUser,
    batchCreateUser: Admin.batchCreateUser,
    batchUpdateUser: Admin.batchUpdateUser,
    batchDeleteUser: Admin.batchDeleteUser,

    // Owner mutations
    makeAdmin: Admin.makeAdmin,
    removeAdmin: Admin.removeAdmin,
  },
};
