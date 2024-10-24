require('app-module-path').addPath(`${__dirname}/../`);
const models = require('models');
const R = require('ramda');
const Result = require('folktale/result');
const { ValidationError, HTTP_CONSTANT } = require('core');

module.exports.perform = async (modelName, condition, message) => {
  try {
    const result = await models[modelName].findOne({
      where: condition
    });
    return R.ifElse(
      () => R.isNil(result),
      () => Result.Ok(result),
      () => Result.Error(new ValidationError(HTTP_CONSTANT.NOT_FOUND, message)),
    )();
  } catch (error) {
    return Result.Error(error);
  }
};
