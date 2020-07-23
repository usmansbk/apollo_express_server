import fetch from 'node-fetch';
import logger from '../config/logger';

const HOST_URL = 'graph.facebook.com';
const fields = [
  'id',
  'first_name',
  'last_name',
  'short_name',
  'email',
  'picture{url}',
];

export default async function loadProfile(accessToken) {
  const req = `https://${HOST_URL}/me?fields=${fields.join(',')}&access_token=${accessToken}`;
  try {
    const res = await fetch(req);
    const body = await res.json();
    if (body?.error) {
      throw new Error(body?.error?.message);
    }

    const profile = {
      firstName: body.first_name,
      lastName: body.last_name,
      nickName: body.short_name,
      email: body.email,
      picture: {
        url: body.picture?.data?.url,
      },
    };
    const identity = {
      clientId: body.id,
      provider: 'FACEBOOK',
      connection: HOST_URL,
    };
    return [profile, identity];
  } catch (err) {
    logger.log(err.message);
  }
  throw new Error('Invalid token');
}
