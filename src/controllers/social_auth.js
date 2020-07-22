import { BadRequest } from '../helpers/errors';
import mailer from '../utils/mailer';
import googleHandler from '../utils/google';
import facebookHandler from '../utils/facebook';
import { GOOGLE, FACEBOOK } from '../helpers/constants';

export default class SocialAuth {
  static async socialLogin(_, args, context) {
    const { input: { provider, token } } = args;
    const { dataSources } = context;
    let profile;
    try {
      switch (provider) {
        case GOOGLE:
          profile = await googleHandler(token);
          break;
        case FACEBOOK:
          profile = await facebookHandler(token);
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
      user = await dataSources.user.findBySocialIdentity(profile);
      if (user) {
        message = `Welcome back, ${user.firstName}!`;
        code = 200;
      } else {
        user = await dataSources.user.createFromSocialIdentity(profile);
        code = 201;
        message = `Welcome ${user.firstName}!`;
        // send a set password link to user.email
        mailer.welcome({
          email: user.email,
          userName: user.firstName,
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
