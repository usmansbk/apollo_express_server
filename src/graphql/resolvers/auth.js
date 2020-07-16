import { Auth as Controller } from '../../controllers';

export default {
  Mutation: {
    signIn: Controller.sigIn,
    signUp: Controller.signUp,
    socialLogin: Controller.socialLogin,
    refreshToken: Controller.refreshToken,
    changeEmail: Controller.changeEmail,
    changePassword: Controller.changePassword,
    forgotPassword: Controller.forgotPassword,
    updateProfile: Controller.updateProfile,
    deleteAccount: Controller.deleteAccount,
  },
};
