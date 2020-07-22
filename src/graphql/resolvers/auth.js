import { Auth, SocialAuth, Admin } from '../../controllers';

export default {
  Mutation: {
    login: Auth.login,
    signUp: Auth.signUp,
    socialLogin: SocialAuth.socialLogin,
    refreshToken: Auth.refreshToken,
    updateEmail: Auth.updateEmail,
    requestChangeEmail: Auth.requestChangeEmail,
    updatePassword: Auth.updatePassword,
    requestResetPassword: Auth.requestResetPassword,
    updateProfile: Auth.updateProfile,
    deleteAccount: Auth.deleteAccount,
    requestDeleteAccount: Auth.requestDeleteAccount,
    verifyEmailAddress: Auth.verifyEmailAddress,
    resendEmailVerificationLink: Auth.resendEmailVerificationLink,
    logout: Auth.logout,

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
