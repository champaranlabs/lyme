const { logInfo, composeResult } = require('core');
const db = require('db/repository');
const R = require('ramda');
const Result = require('folktale/result');
const { ValidateBcryptString } = require('utils');
const GetActiveOtpQuery = require('resources/otps/queries/get-active-otp-query');
const UpdateOtpQuery = require('resources/otps/queries/update-otp-query');

module.exports.perform = async ({
  emailOrMobile, otp
}) => {
  logInfo('Request to validate otp service', {
    emailOrMobile, otp
  });
  return composeResult(
    otpResult => R.ifElse(
      () => R.isNil(otpResult),
      () => Result.Ok(false),
      () => composeResult(
        isValid => R.ifElse(
          () => isValid,
          () => composeResult(
            () => Result.Ok(isValid),
            () => db.find(new UpdateOtpQuery(otpResult.id, {
              attemptCount: otpResult.attemptCount - 1,
              isVerified: true
            }))
          )(),
          () => composeResult(
            () => Result.Ok(isValid),
            () => db.find(new UpdateOtpQuery(otpResult.id, {
              attemptCount: otpResult.attemptCount - 1
            }))
          )()
        )(),
        () => ValidateBcryptString.perform({ string: otp, hashedString: otpResult.otp })
      )()
    )(),
    () => db.findOne(new GetActiveOtpQuery(emailOrMobile))
  )();
};
