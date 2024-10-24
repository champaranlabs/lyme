const Route = require('route');
const { respond,logInfo } = require('core');
const Result = require('folktale/result');

async function get() {
  logInfo('Request to get server health-check api', {});
  const result = Result.Ok({ isAlive: true });
  return respond(result, 'Successfully get api health!', 'Failed to get api health!');
}

Route.withOutSecurity().noAuth().get('/api/health-check-api', get).bind();
// # psql -h qa-fzta.clwmiq4ciec9.ap-south-1.rds.amazonaws.com -p 5432 -U qafzta qafacultyZone