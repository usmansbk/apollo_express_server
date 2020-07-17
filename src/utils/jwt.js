import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const file = '../../jwtRS256.key';
const privateKey = fs.readFileSync(path.resolve(__dirname, file));
const publicKey = fs.readFileSync(path.resolve(__dirname, `${file}.pub`));

function sign(user, expiresIn = '15min') {
  return jwt.sign({ user }, { key: privateKey, passphrase: '' }, { expiresIn, algorithm: 'RS256' });
}

function verify(token) {
  if (!token) return null;
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
}

export default {
  sign,
  verify,
};
