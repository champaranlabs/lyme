require('app-module-path').addPath(`${__dirname}/../`);
const models = require('models');
const Result = require('folktale/result');

module.exports.perform = async (modelName, data, condition) => {
  try {
    const result = await models[modelName].findAll({
      ...data
    }, {
      where: condition,
      returning: true
    });
    return Result.Ok(result[1][0]);
  } catch (error) {
    return Result.Error(error);
  }
};
