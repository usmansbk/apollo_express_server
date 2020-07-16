// import logger from '../config/logger';
import MutationResponse from '../helpers/MutationResponse';

export default class Auth {
  static sigIn() {
    return ({
      code: '201',
      success: true,
      message: 'Login successful',
      user: {
        id: 1,
      },
      token: '1234',
    });
  }

  static async signUp(_source, args, context) {
    const { input } = args;
    const { dataSources } = context;
    const user = await dataSources.user.create(input);
    const data = {
      user,
    };

    return MutationResponse({ code: 201, message: 'Signup successful', data });
  }

  static socialLogin() {
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
