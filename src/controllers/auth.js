// import logger from '../config/logger';

export default class Auth {
  static async sigIn(_source, args, context) {
    const { input } = args;
    const { dataSources } = context;
    const res = {
      code: '201',
      success: true,
    };

    try {
      const user = await dataSources.user.findByEmailAndPassword(input);
      res.user = user;
      res.message = `Welcome back, ${user.firstName}!`;
      res.token = '1234';
    } catch (err) {
      res.code = '400';
      res.success = false;
      res.message = err.message;
    }
    return res;
  }

  static async signUp(_source, args, context) {
    const { input } = args;
    const { dataSources } = context;
    const res = {
      code: '201',
      success: true,
      message: `We sent an email to ${input.email} so we can confirm you're you!`,
    };

    try {
      const user = await dataSources.user.create(input);
      res.user = user;
      res.token = '1234';
      res.verified = false;
    } catch (err) {
      res.code = '400';
      res.success = false;
      res.message = err.message;
    }
    return res;
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
