import { Auth as Controller, SocialAuth } from '../../controllers';

export default {
  Mutation: {
    login: Controller.login,
    signUp: Controller.signUp,
    socialLogin: SocialAuth.socialLogin,
    refreshToken: Controller.refreshToken,
    updateEmail: Controller.updateEmail,
    requestChangeEmail: Controller.requestChangeEmail,
    updatePassword: Controller.updatePassword,
    requestResetPassword: Controller.requestResetPassword,
    updateProfile: Controller.updateProfile,
    deleteAccount: Controller.deleteAccount,
    requestDeleteAccount: Controller.requestDeleteAccount,
    verifyEmailAddress: Controller.verifyEmailAddress,
    resendEmailVerificationLink: Controller.resendEmailVerificationLink,
    logout: Controller.logout,
  },
};
