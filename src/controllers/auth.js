// import logger from '../config/logger';

export default class Auth {
  static async sigIn(_source, args, context) {
    const { input } = args;
    const { dataSources } = context;
    const res = {
      code: 200,
      success: true,
    };

    try {
      const user = await dataSources.user.findByEmailAndPassword(input);
      res.user = user;
      res.message = `Welcome back, ${user.firstName}!`;
      const payload = { id: user.id };
      res.token = dataSources.jwt.sign(payload);
      res.refreshToken = dataSources.jwt.sign(payload, '7d');
    } catch (err) {
      res.code = err.extensions?.code || 400;
      res.success = false;
      res.message = err.message;
    }
    return res;
  }

  static async signUp(_source, args, context) {
    const { input } = args;
    const { dataSources } = context;
    const res = {
      code: 201,
      success: true,
      message: `We sent an email to ${input.email} so we can confirm you're you!`,
    };

    try {
      const user = await dataSources.user.create(input);
      res.user = user;
      const payload = { id: user.id };
      res.token = dataSources.jwt.sign(payload);
      res.refreshToken = dataSources.jwt.sign(payload, '7d');
      res.verified = false;
    } catch (err) {
      console.log(err);
      res.code = 400;
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

  static signOut() {
    return null;
  }
}
