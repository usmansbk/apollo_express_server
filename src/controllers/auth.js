// import logger from '../config/logger';

export default class Auth {
  static async sigIn(_source, args, context) {
    const { input } = args;
    const { dataSources } = context;
    const user = await dataSources.user.findByEmailAndPassword(input);

    return {
      code: '201',
      success: true,
      message: 'Login successful',
      user,
      token: '1234',
    };
  }

  static async signUp(_source, args, context) {
    const { input } = args;
    const { dataSources } = context;
    const user = await dataSources.user.create(input);

    return {
      code: '201',
      success: true,
      message: 'Welcome!',
      user,
      token: '1234',
    };
  }

  static socialLogin() {
    return null;
  }

  static resendVerificationLink() {
    return null;
  }

  static refreshToken() {
    return null;
  }

  static changeEmail() {
    return null;
  }

  static changePassword() {
    return null;
  }

  static forgotPassword() {
    return null;
  }

  static updateProfile() {
    return null;
  }

  static deleteAccount() {
    return null;
  }
}
