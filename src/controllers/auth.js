// import logger from '../config/logger';
import { BadRequest, Unauthorized, Forbidden } from '../helpers/errors';
import mailer from '../utils/mailer';

const appName = process.env.APP_NAME;

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
      // send verify email link to user.email
      mailer.confirm({
        email: user.email,
        subject: `Welcome to ${appName}`,
        text: "Please confirm we've got your email right",
        buttonText: `I'm ${user.firstName}`,
        ticket: accessToken,
        csrfToken: refreshToken,
        userName: user.firstName,
      });
      return {
        code: 201,
        success: true,
        message: `We sent an email to ${input.email} so we can confirm you're you!`,
        accessToken,
        refreshToken,
        user,
      };
    } catch (err) {
      return BadRequest(`${err.message}. Make sure you've entered your correct details`);
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
    if (!(me && refreshToken)) {
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
      message: 'Access Token refreshed.',
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  static async updateEmail(_source, args, context) {
    const { input } = args;
    const { dataSources, req } = context;
    const ticket = req.headers?.ticket;
    const csrfToken = req.headers?.csrf_token;
    if (!(ticket && csrfToken)) {
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
        message: 'Your email address has been updated.',
        accessToken,
        refreshToken,
        user,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  // send change email link to user email address
  static async requestChangeEmail(_, _args, context) {
    const { dataSources, me } = context;

    if (!me) {
      return Unauthorized();
    }

    try {
      const user = await dataSources.user.findById(me.id);
      if (!user) {
        return Unauthorized();
      }
      const [ticket, csrfToken] = dataSources.jwt.getTokens(me, '5min');
      await dataSources.csrf.create({ id: me.id, csrfToken });
      mailer.confirm({
        email: user.email,
        subject: 'Change email address',
        text: `Hi ${user.firstName}, Need to reset your password? Click the button below to get started.`,
        buttonText: 'Continue',
        expiresIn: 5,
        ticket,
        csrfToken,
      });
      return {
        code: 200,
        success: true,
        message: `We sent an update email link to ${user.email}`,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }

  static async updatePassword(_, args, context) {
    const { input } = args;
    const { dataSources, req } = context;
    const ticket = req.headers?.ticket;
    const csrfToken = req.headers?.csrf_token;
    if (input.newPassword !== input.confirmPassword) {
      return BadRequest('Passwords do not match');
    }

    if (!(ticket && csrfToken)) {
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
      const user = await dataSources.user.updatePassword(me, input);
      const [accessToken, refreshToken] = dataSources.jwt.getTokens(user);
      await dataSources.csrf.delete(user.id);
      return {
        code: 200,
        success: true,
        message: 'Your password has been updated.',
        accessToken,
        refreshToken,
        user,
      };
    } catch (err) {
      const message = err?.errors[0]?.message || err.message;
      return BadRequest(message);
    }
  }

  // send update password link to user email address
  static async requestResetPassword(_, _args, context) {
    const { dataSources, me } = context;

    if (!me) {
      return Unauthorized();
    }

    try {
      const user = await dataSources.user.findById(me.id);
      if (!user) {
        return Unauthorized();
      }
      const [ticket, csrfToken] = dataSources.jwt.getTokens(me, '5min');
      await dataSources.csrf.create({ id: me.id, csrfToken });
      mailer.confirm({
        email: user.email,
        subject: 'Reset Password',
        text: `Hi ${user.firstName}, You requested to change password? Delete if you did not.`,
        buttonText: 'Continue',
        ticket,
        csrfToken,
        expiresIn: 5,
      });
      return {
        code: 200,
        success: true,
        message: `We sent a reset password link to ${user.email}`,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
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
