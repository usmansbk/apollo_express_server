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

  static signUp() {
    return null;
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
