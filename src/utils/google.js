import { google } from 'googleapis';
import config from '../../client_secret.json';
import logger from '../config/logger';

const { web } = config;

export default async function loadProfile(accessToken) {
  const plus = google.plus('v1');

  const credentials = { access_token: accessToken };

  try {
    const oauth2 = google.oauth2('v2');
    const tokenInfo = await oauth2.tokeninfo(credentials);

    if (tokenInfo) {
      const auth = new google.auth.OAuth2(
        web.client_id,
        web.client_secret,
      );
      auth.credentials = credentials;
      const { data } = tokenInfo;

      const res = await plus.people.get({ userId: data.user_id, auth });
      const { data: user } = res;
      const {
        id, name: { familyName, givenName }, image, emails, nickname,
      } = user;
      const profile = {
        firstName: givenName,
        lastName: familyName,
        nickName: nickname,
        picture: {
          url: image?.url,
        },
        email: emails?.[0]?.value,
      };
      const identity = {
        provider: 'GOOGLE',
        connection: 'googleapis',
        clientId: id,
      };
      return [profile, identity];
    }
  } catch (err) {
    logger.log(err);
  }

  throw new Error('Invalid token');
}
