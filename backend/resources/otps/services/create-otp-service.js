const {
    logInfo, composeResult, uuid, numeric
} = require('core');
const db = require('db/repository');
const R = require('ramda');
const dayjs = require('utils/dayjs');
const { BcryptString } = require('utils');
const GetActiveOtpQuery = require('resources/otps/queries/get-active-otp-query');
const CreateOtpQuery = require('resources/otps/queries/create-otp-query');
const UpdateOtpQuery = require('resources/otps/queries/update-otp-query');

const createOtp = details => composeResult(
    hashedOtp => db.execute(new CreateOtpQuery(details.otpId, {
        purpose: details.purpose,
        otpSendOn: numeric(details.emailOrMobile) ? 'Mobile' : 'Email',
        emailOrMobile: details.emailOrMobile,
        otp: hashedOtp,
        expireAt: dayjs().add(10, 'minute').format(),
        attemptCount: 3
    })),
    () => BcryptString.perform({ string: details.otp })
)();
module.exports.perform = async ({
    purpose, emailOrMobile, otp
}) => {
    const otpId = uuid.v4();
    logInfo('Request to create otp service', {
        purpose, emailOrMobile
    });
    return composeResult(
        otpResult => R.ifElse(
            () => R.isNil(otpResult),
            () => createOtp({
                otpId, otp, purpose, emailOrMobile
            }),
            () => composeResult(
                () => createOtp({
                    otpId, otp, purpose, emailOrMobile
                }),
                () => db.find(new UpdateOtpQuery(otpResult.id, {
                    attemptCount: 0
                }))
            )()
        )(),
        () => db.findOne(new GetActiveOtpQuery(emailOrMobile))
    )();
};
