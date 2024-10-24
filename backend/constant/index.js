const Security = require('./security');
const Location = require('./location-categories-states-country');
const CustomFuction = require('./custom-function');
const DialCodes = require('./dial-codes');
const CountryCodes = require('./country-codes');
const EmployerRoles = require('./employer-roles');
const Common = require('./common');

module.exports = {
  ROLE: Security.ROLE,
  COMPANY_RELATIONSHIP: Security.COMPANY_RELATIONSHIP,
  SALT_ROUND: Security.SALT_ROUND,
  JOINING_BALANCE: Security.JOINING_BALANCE,
  STATES: Location.STATES,
  CATEGORIES: Location.CATEGORIES,
  COUNTRIES: Location.COUNTRIES,
  DIAL_CODES: DialCodes,
  COUNTRY_CODES: CountryCodes,
  ISEMPTY_OBJECT: CustomFuction.ISEMPTY_OBJECT,
  OTP_PURPOSE: Security.OTP_PURPOSE,
  EMPLOYER_ROLE: EmployerRoles.EMPLOYER_ROLE,
  PROFICIENCY: Common.PROFICIENCY
};
