// import logger from '../config/logger';
import { BadRequest, Unauthorized, Forbidden } from '../helpers/errors';

export default class Auth {
  static async login(_source, args, context) {
    const { input } = args;
    const { dataSources } = context;

    try {
      const user = await dataSources.user.findByEmailAndPassword(input);
      const { id } = user;
      const payload = { id };
      const [accessToken, refreshToken] = dataSources.jwt.getTokens(payload);
      await dataSources.session.create({ id, refreshToken });
      return {
        code: 200,
        success: true,
        message: `Welcome back, ${user.firstName}!`,
        accessToken,
        refreshToken,
        user,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  static async signUp(_source, args, context) {
    const { input } = args;
    const { dataSources } = context;

    try {
      const user = await dataSources.user.create(input);
      const { id } = user;
      const payload = { id };
      const [accessToken, refreshToken] = dataSources.jwt.getTokens(payload);
      await dataSources.session.create({ id, refreshToken });
      return {
        code: 201,
        success: true,
        message: `We sent an email to ${input.email} so we can confirm you're you!`,
        accessToken,
        refreshToken,
        user,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  static socialLogin() {
    return null;
  }

  static resendVerificationLink() {
    return null;
  }

  static verifyEmailAddress() {
    return null;
  }

  static async refreshToken(_source, _args, context) {
    const { dataSources, req } = context;
    const refreshToken = req.headers?.refresh_token;

    if (!refreshToken) {
      return Unauthorized();
    }
    const user = dataSources.jwt.verify(refreshToken);
    if (!user) {
      return Unauthorized('Refresh token expired.');
    }
    const session = await dataSources.session.findById(user.id);
    if (session?.refreshToken !== refreshToken) {
      return Unauthorized('Invalid refresh token.');
    }
    const [accessToken, newRefreshToken] = dataSources.jwt.getTokens(user);
    await dataSources.session.create({ id: user.id, refreshToken: newRefreshToken });

    return {
      code: 200,
      success: true,
      message: 'Token refreshed',
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  static async updateEmail(_source, args, context) {
    const { input } = args;
    const { dataSources, req } = context;
    const resetEmail = req.headers?.reset_email;
    if (!resetEmail) {
      return BadRequest('Set reset_email header.');
    }
    const me = dataSources.jwt.verify(resetEmail);
    if (!me) {
      return Forbidden('Change email link expired.');
    }
    try {
      const user = dataSources.user.updateEmail(me, input);
      const [accessToken, refreshToken] = dataSources.jwt.getTokens(user);
      await dataSources.session.create({ id: user.id, refreshToken });
      return {
        code: 200,
        success: true,
        message: 'Password changed.',
        accessToken,
        refreshToken,
        user,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  // send change email link to user
  static changeEmail() {
    return null;
  }

  static updatePassword() {
    return null;
  }

  // send update password link to user
  static resetPassword() {
    return null;
  }

  static updateProfile() {
    return null;
  }

  static deleteAccount() {
    return null;
  }

  static async logout(_source, _args, context) {
    const { dataSources, me } = context;
    if (!me) {
      return Unauthorized();
    }

    try {
      const success = await dataSources.session.delete(me.id);
      return {
        code: 204,
        success,
        message: 'You have logged out.',
      };
    } catch (err) {
      return Unauthorized(err.message);
    }
  }
}
