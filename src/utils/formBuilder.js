/**
 * Remove undefined keys [null values are allowed]
 */
export default function buildForm(data = {}, { ignore = [] }) {
  const keys = Object.keys(data);
  const obj = {};
  keys.forEach((key) => {
    const val = data[key];
    const isIgnored = ignore.includes(key);
    if (val !== undefined && !isIgnored) {
      obj[key] = val;
    }
  });
  return obj;
}
