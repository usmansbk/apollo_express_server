export function Unauthorized(message = 'You are not logged in.') {
  return {
    message,
    success: false,
    code: 401,
  };
}

export function BadRequest(message) {
  return {
    message,
    success: false,
    code: 400,
  };
}

export function Forbidden(message) {
  return {
    message,
    success: false,
    code: 403,
  };
}

export function NotFound(message) {
  return {
    message,
    success: false,
    code: 404,
  };
}

export function UnsupportedMediaType(message) {
  return {
    message,
    success: false,
    code: 415,
  };
}

export default {
  Unauthorized,
  BadRequest,
  Forbidden,
  NotFound,
  UnsupportedMediaType,
};
