const SALT_ROUND = 10;
const JOINING_BALANCE = 1000;
const ROLE = {
  ADMIN: 'Admin',
  USER: 'User',
  EMPLOYER: 'Employer',
  CONSULTANT: 'Consultant',
  EMPLOYER_IND: 'EmployerIndividual',
  EMPLOYER_GUEST: 'EmployerGuest',
  TEMPORARY_USER: 'TemporaryUser',
  ONBOARD_USER: 'OnboardUser',
  TEMPORARY_EMPLOYER: 'TemporaryEmployer'
};

const COMPANY_RELATIONSHIP = {
  BRANCH: 'Branch',
  FRANCHISE: 'Franchise',
  SELF: 'Self'
};

const OTP_PURPOSE = {
  VERIFICATION: 'Verification', REGISTRATION: 'Registration', RESET_PASSWORD: 'ResetPassword'
};


module.exports = {
  SALT_ROUND,
  ROLE,
  COMPANY_RELATIONSHIP,
  JOINING_BALANCE,
  OTP_PURPOSE
};
