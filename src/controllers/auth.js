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
    const { dataSources, req, me } = context;
    const refreshToken = req.headers?.refresh_token;
    if (!(me || refreshToken)) {
      return Unauthorized();
    }

    const payload = dataSources.jwt.verify(refreshToken);
    if (!payload) {
      return Unauthorized('Refresh token expired');
    }
    const session = await dataSources.session.findById(me.id);
    if (session?.refreshToken !== refreshToken) {
      return Unauthorized('Invalid refresh token');
    }
    const [accessToken, newRefreshToken] = dataSources.jwt.getTokens(me);
    await dataSources.session.create({ id: me.id, refreshToken: newRefreshToken });

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
    const ticket = req.headers?.ticket;
    const csrfToken = req.headers?.csrf_token;
    if (!(ticket || csrfToken)) {
      return BadRequest('ticket and csrf_token jwt must be set in headers');
    }
    const me = dataSources.jwt.verify(ticket);
    if (!me) {
      return Forbidden('Invalid ticket');
    }
    const csrf = await dataSources.csrf.findById(me.id);
    if (csrf?.csrfToken !== csrfToken) {
      return Unauthorized('Invalid csrf token');
    }
    try {
      const user = await dataSources.user.updateEmail(me, input);
      const [accessToken, refreshToken] = dataSources.jwt.getTokens(user);
      await dataSources.csrf.delete(user.id);
      return {
        code: 200,
        success: true,
        message: 'Password changed',
        accessToken,
        refreshToken,
        user,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  // send change email link to user email address
  static async changeEmail(_, _args, context) {
    const { dataSources, me } = context;

    if (!me) {
      return Unauthorized();
    }

    try {
      const user = await dataSources.user.findById(me.id);
      if (!user) {
        return Unauthorized();
      }
      const [accessToken, csrfToken] = dataSources.jwt.getTokens(me, '15min');
      await dataSources.csrf.create({ id: me.id, csrfToken });
      return {
        code: 200,
        success: true,
        message: `We sent a email update link to ${user.email}`,
        accessToken,
        refreshToken: csrfToken,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  static updatePassword() {
    return null;
  }

  // send update password link to user email address
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
        message: 'You have logged out',
      };
    } catch (err) {
      return Unauthorized(err.message);
    }
  }
}
