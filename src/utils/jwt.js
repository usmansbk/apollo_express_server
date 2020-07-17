import jwt from 'jsonwebtoken';

function sign(payload) {
  return jwt.sign(payload, 'test');
}

function verify(token) {
  return jwt.verify(token, 'test');
}

export default {
  sign,
  verify,
};
