import { Auth as Controller } from '../../controllers';

export default {
  Mutation: {
    login: Controller.login,
    signUp: Controller.signUp,
    socialLogin: Controller.socialLogin,
    refreshToken: Controller.refreshToken,
    updateEmail: Controller.updateEmail,
    requestChangeEmail: Controller.requestChangeEmail,
    updatePassword: Controller.updatePassword,
    requestResetPassword: Controller.requestResetPassword,
    updateProfile: Controller.updateProfile,
    deleteAccount: Controller.deleteAccount,
    verifyEmailAddress: Controller.verifyEmailAddress,
    resendVerificationLink: Controller.resendVerificationLink,
    logout: Controller.logout,
  },
};
