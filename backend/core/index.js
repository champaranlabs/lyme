require('app-module-path').addPath(__dirname);

// * Utilities
const composeResult = require('core/utilities/compose-result');
const ifElse = require('core/utilities/ifElse');
const respond = require('core/utilities/respond');
const transformToResult = require('core/utilities/transform-to-result');
const whenResult = require('core/utilities/whenResult');
const withArgs = require('core/utilities/with-args');
const doNothing = require('core/utilities/doNothing');
const args = require('core/utilities/args');
const utilityLogger = require('core/utilities/logger');
const uuid = require('core/utilities/uuid');
const ApiError = require('core/utilities/api-error');
const ValidationError = require('core/utilities/validation-error');
const HTTP_CONSTANT = require('core/utilities/http-constant');

// * Validations
const isBoolean = require('core/validations/is-boolean');
const hasLengthOf = require('core/validations/has-length-of');
const isEmail = require('core/validations/is-email');
const isMobileNumber = require('core/validations/is-mobile-number');
const isStringNumeric = require('core/validations/is-string-numeric');
const isUndefined = require('core/validations/is-undefined');
const maxValue = require('core/validations/max-value');
const minValue = require('core/validations/min-value');
const notEmpty = require('core/validations/not-empty');
const numeric = require('core/validations/numeric');
const shouldBeUuid = require('core/validations/should-be-uuid');
const isTimestamp = require('core/validations/is-timestamp');
const validate = require('core/validations/validate');
const isRegex = require('core/validations/is-regex');
const isInclude = require('core/validations/is-include');
const checkGivenValues = require('core/validations/check-given-values');
// * JWT Helper
const token = require('core/token');
// * Logger
const Logger = require('core/logger');

module.exports = {
  logInfo: utilityLogger.logInfo,
  logError: utilityLogger.logError,
  logDebug: utilityLogger.logDebug,
  composeResult,
  ifElse,
  respond,
  transformToResult,
  whenResult,
  withArgs,
  doNothing,
  uuid,
  args,
  ApiError,
  ValidationError,
  // Validations
  isBoolean,
  hasLengthOf,
  isEmail,
  isMobileNumber,
  isStringNumeric,
  isUndefined,
  maxValue,
  minValue,
  notEmpty,
  numeric,
  shouldBeUuid,
  isTimestamp,
  validate,
  isRegex,
  isInclude,
  checkGivenValues,
  // HTTP_CONSTANT
  HTTP_CONSTANT,
  // token
  token,
  // Logger
  Logger
};
