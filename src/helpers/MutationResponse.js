export default function res({
  code = '200', success = true, message, data = {},
}) {
  const obj = {
    code,
    message,
    success,
  };

  return Object.assign(obj, data);
}
