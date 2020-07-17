import jwt from 'jsonwebtoken';

async function sign(payload) {
  return jwt.sign(payload, 'test');
}

async function verify(token) {
  return jwt.verify(token, 'test');
}

export default {
  sign,
  verify,
};
