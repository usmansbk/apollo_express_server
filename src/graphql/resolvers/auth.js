import { Auth as Controller } from '../../controllers';

export default {
  Mutation: {
    login: Controller.login,
    signUp: Controller.signUp,
    socialLogin: Controller.socialLogin,
    refreshToken: Controller.refreshToken,
    updateEmail: Controller.updateEmail,
    changeEmail: Controller.changeEmail,
    updatePassword: Controller.updatePassword,
    resetPassword: Controller.resetPassword,
    updateProfile: Controller.updateProfile,
    deleteAccount: Controller.deleteAccount,
    verifyEmailAddress: Controller.verifyEmailAddress,
    resendVerificationLink: Controller.resendVerificationLink,
    logout: Controller.logout,
  },
};
