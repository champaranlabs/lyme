const crypto = require('crypto');

const generateRandomString = length => crypto.randomBytes(Math.ceil(length / 2))
  .toString('hex')
  .slice(0, length);

const generateRandomDigit = (length) => {
  const min = 10 ** (length - 1);
  const max = (10 ** length) - 1;
  return crypto.randomInt(min, max).toString();
};

module.exports = {
  generateRandomString,
  generateRandomDigit
};
