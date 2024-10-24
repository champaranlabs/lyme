const bcrypt = require('bcrypt');
const { logError, ApiError, HTTP_CONSTANT } = require('core');
const Result = require('folktale/result');
const config = require('config/config');

module.exports.perform = async ({ string, hashedString, salt = config.saltGlobal }) => {
  const saltString = `${salt}.${string}`;
  try {
    const isCompared = await bcrypt.compare(saltString, hashedString);
    console.log('string, hashedString', string, hashedString, saltString, isCompared);
    return Result.Ok(isCompared);
  } catch (error) {
    logError('Failed to comapare string', error);
    return Result.Error(new ApiError(0, 'Something went wrong.', HTTP_CONSTANT.BAD_REQUEST));
  }
};
