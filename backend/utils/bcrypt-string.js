const bcrypt = require('bcrypt');
const Result = require('folktale/result');
const { SALT_ROUND } = require('constant');
const { logError, ApiError, HTTP_CONSTANT } = require('core');
const config = require('config/config');

module.exports.perform = async ({ string, salt = config.saltGlobal }) => {
  const saltString = `${salt}.${string}`;
  try {
    const genSalt = await bcrypt.genSalt(SALT_ROUND);
    const hashedString = await bcrypt.hash(saltString, genSalt);
    return Result.Ok(hashedString);
  } catch (error) {
    logError('Failed to hash', error);
    return Result.Error(new ApiError(0, 'Failed to hash', HTTP_CONSTANT.NOT_FOUND));
  }
};
