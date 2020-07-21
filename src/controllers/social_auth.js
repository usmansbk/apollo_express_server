import { BadRequest } from '../helpers/errors';
import mailer from '../utils/mailer';
import googleHandler from '../utils/google';
import facebookHandler from '../utils/facebook';
import { GOOGLE, FACEBOOK } from '../helpers/constants';

require('dotenv').config();

const { APP_NAME } = process.env;

export default class SocialAuth {
  static async socialLogin(_, args, context) {
    const { input: { provider, token, clientId } } = args;
    const { dataSources } = context;
    let profile;
    try {
      switch (provider) {
        case GOOGLE:
          profile = await googleHandler(token);
          break;
        case FACEBOOK:
          profile = await facebookHandler(token, clientId);
          break;
        default:
          return BadRequest(`${provider} not supported`);
      }
    } catch (err) {
      return BadRequest(err.message);
    }

    let user;
    let message;
    let code;
    try {
      user = await dataSources.user.findBySocialId(profile);
      if (user) {
        message = `Welcome back, ${user.firstName}!`;
        code = 200;
      } else {
        user = await dataSources.user.createFromSocial(profile);
        const payload = { id: user.id };
        const [csrfToken] = dataSources.jwt.getTokens(payload, '1d');
        await dataSources.csrf.create({ id: user.id, csrfToken });

        code = 201;
        message = `Welcome ${user.firstName}! We sent set password instructions to ${user.email}.`;
        // send a set password link to user.email
        mailer.confirm({
          email: user.email,
          subject: 'Welcome!',
          text: `Thank you for signing up with ${APP_NAME}. Please click the button below to set your password.`,
          buttonText: 'Set password',
          token: csrfToken,
          userName: user.firstName,
          expiresIn: '24 hours',
        });
      }
      const { id } = user;
      const payload = { id };
      const [accessToken, refreshToken] = dataSources.jwt.getTokens(payload);
      await dataSources.session.create({ id, refreshToken });
      return {
        code,
        success: true,
        message,
        accessToken,
        refreshToken,
        user,
      };
    } catch (err) {
      return BadRequest(err.message);
    }
  }
}
