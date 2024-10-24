const Route = require('route');
const { respond,logInfo } = require('core');
const Result = require('folktale/result');
const { sequelize } = require('models');

async function get() {
  logInfo('Request to get health-check db api', {});
  let result;
  try {
    await sequelize.authenticate();
    result = Result.Ok({ isAlive: true });
  } catch (error) {
    result = Result.Ok({ isAlive: false });
  }
  return respond(result, 'Successfully get health-check db!', 'Failed to get health-check db!');
}

Route.withOutSecurity().noAuth().get('/api/health-check-db-api', get).bind();
