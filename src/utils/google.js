import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import config from '../../client_secret.json';

const { web } = config;

export default async function loadProfile(accessToken) {
  const plus = google.plus('v1');

  const credentials = { access_token: accessToken };

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
      id, name: { familyName, givenName }, image, emails, nickname, language,
    } = user;
    const profile = {
      clientId: id,
      firstName: givenName,
      lastName: familyName,
      nickName: nickname,
      picture: image?.url,
      email: emails[0]?.value,
      language,
    };
    return profile;
  }
  throw new Error('Invalid token');
}
