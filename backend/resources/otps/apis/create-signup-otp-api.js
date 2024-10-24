const Route = require('route');
const {
    respond, composeResult, logInfo, ValidationError, numeric, whenResult, token
} = require('core');
const db = require('db/repository');
const R = require('ramda');
const Result = require('folktale/result');
const CreateOtpUserSignupValidator = require('resources/otps/validators/create-otp-user-signup-validator');
const GetUserUsingEmailQuery = require('resources/users/queries/get-user-using-email-query');
const { GenerateRandomDigit } = require('utils');
const CreateOtpService = require('resources/otps/services/create-otp-service');
const { ROLE } = require('constant');
const dayjs = require('utils/dayjs');
const sendEmail = require('utils/send-email')

const generateToken = async (details) => {
    const generatedTokenResult = await token.generate({
        email: details.email,
        password: details.password,
        name: details.name,
        exp: dayjs().tz('Asia/Kolkata').add(30, 'minute').unix(),
        requestedRole: details.requestedRole,
        roles: [details.role]
    });

    return whenResult(generatedToken => Result.Ok({
        token: generatedToken,
        email: details.email,
        password: details.password,
        name: details.name,
        requestedRole: details.requestedRole,
        roles: [details.role]
    }))(generatedTokenResult);
};

async function post(req) {
    const {
        name, email, password, confirmPassword
    } = req.body;

    logInfo('Request to create otp user signup', {
        name, email, password, confirmPassword
    });
    const otp = GenerateRandomDigit(4)
    console.log('OTP', otp);
    const response = await composeResult(
        dbResult => R.ifElse(
            () => R.isNil(dbResult),
            () => composeResult(
                () => generateToken({
                    name,
                    email,
                    password,
                    role: ROLE.TEMPORARY_USER,
                    requestedRole: 'User'
                }),
                () => CreateOtpService.perform({
                    emailOrMobile: email,
                    otp,
                    purpose: 'Signup',
                    context: 'Registration'
                })
            )(),
            () => Result.Error(new ValidationError(0, `Email is already registered.'`))
        )(),
        () => db.findOne(new GetUserUsingEmailQuery(email)),
        () => CreateOtpUserSignupValidator.validate({
            name, email, password
        })
    )();

    whenResult(
        result => R.ifElse(
            () => R.isNil(result),
            () => Result.Ok('NO Mail'),
            () => sendEmail.perform({
                email, context: 'registration', data: {
                    otp
                }
            })
        )()
    )(response)

    return respond(response, 'Successfully created signup otp !', 'Failed to create otp signup otp !');
}

Route.withOutSecurity().noAuth().post('/api/v1/signup-otps', post).bind();
