import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const file = '../../jwtRS256.key';
const privateKey = fs.readFileSync(path.resolve(__dirname, file));
const publicKey = fs.readFileSync(path.resolve(__dirname, `${file}.pub`));

function sign(payload) {
  return jwt.sign(payload, { key: privateKey, passphrase: '' }, { expiresIn: '2d', algorithm: 'RS256' });
}

function verify(token) {
  return jwt.verify(token, publicKey);
}

export default {
  sign,
  verify,
};
