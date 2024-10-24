const Authorization = require('./authorization');
const BcryptString = require('./bcrypt-string');
const CheckDataExist = require('./check-data-exist');
const GetDataExist = require('./get-data-exist');

const UpdateData = require('./update-data');
const GetAllData = require('./get-all-data');
const RandomStringNumber = require('./random-string-number');
const ValidateBcryptString = require('./validate-bcrypt-string');
const dayjs = require('./dayjs');

module.exports = {
  hasPermission: Authorization.hasPermission,
  BcryptString,
  CheckDataExist,
  GetDataExist,
  UpdateData,
  GetAllData,
  GenerateRandomString: RandomStringNumber.generateRandomString,
  GenerateRandomDigit: RandomStringNumber.generateRandomDigit,
  ValidateBcryptString,
  dayjs
};
