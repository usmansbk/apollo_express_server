import { Auth as Controller } from '../../controllers';

export default {
  Mutation: {
    login: Controller.login,
    signUp: Controller.signUp,
    socialLogin: Controller.socialLogin,
    refreshToken: Controller.refreshToken,
    changeEmail: Controller.changeEmail,
    changePassword: Controller.changePassword,
    forgotPassword: Controller.forgotPassword,
    updateProfile: Controller.updateProfile,
    deleteAccount: Controller.deleteAccount,
    logout: Controller.logout,
  },
};
