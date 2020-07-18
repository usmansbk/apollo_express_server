import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import logger from '../config/logger';

const file = '../../jwtRS256.key';
const privateKey = fs.readFileSync(path.resolve(__dirname, file));
const publicKey = fs.readFileSync(path.resolve(__dirname, `${file}.pub`));

function sign(user, expiresIn = '15min') {
  return jwt.sign({ user }, { key: privateKey, passphrase: '' }, { expiresIn, algorithm: 'RS256' });
}

function verify(token) {
  if (token) {
    try {
      const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
      return payload.user;
    } catch (err) {
      logger.log(err.message);
    }
  }
  return null;
}

function getTokens(user, expiresIn) {
  const accessToken = sign(user, expiresIn);
  const refreshToken = sign({ seed: Math.round(Math.random() * 10000) }, expiresIn || '7d');

  return [accessToken, refreshToken];
}

export default {
  sign,
  verify,
  getTokens,
};
