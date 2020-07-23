import { Auth, SocialAuth } from '../../controllers';

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
  },
};
