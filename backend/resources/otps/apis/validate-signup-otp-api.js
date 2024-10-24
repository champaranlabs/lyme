const Route = require('route');
const {
    respond, composeResult, logInfo, ValidationError, numeric, whenResult, token
} = require('core');
const db = require('db/repository');
const R = require('ramda');
const Result = require('folktale/result');
const CreateOtpUserSignupValidator = require('resources/otps/validators/create-otp-user-signup-validator');
const GetUserUsingEmailQuery = require('resources/users/queries/get-user-using-email-query');
const ValidateOtpService = require('resources/otps/services/validate-otp-service');
const CreateUserAndAssignRoleService = require('resources/users/services/create-user-and-assign-role-service');
const { GenerateRandomDigit } = require('utils');
const { hasPermission } = require('utils');
const { ROLE } = require('constant');
const dayjs = require('utils/dayjs');

const generateToken = async (result) => {
    const generatedTokenResult = await token.generate({
        id: result.user.id,
        email: result.user.email,
        mobile: result.user.mobile,
        roles: [result.role.name]
    });

    return whenResult(generatedToken => Result.Ok({
        id: result.user.id,
        email: result.user.email,
        mobile: result.user.mobile,
        roles: [result.role.name],
        token: generatedToken,
    }))(generatedTokenResult);
};

async function post(req) {
    const {
        name, email, password, requestedRole
    } = req.decoded;
    const {
        otp
    } = req.body;

    logInfo('Request to validate otp user signup', {
        name, email, password, requestedRole
    });

    const response = await composeResult(
        dbResult => R.ifElse(
            () => R.isNil(dbResult),
            () => composeResult(
                (result) => generateToken(result),
                () => CreateUserAndAssignRoleService.perform({
                    email,
                    mobile: null,
                    name,
                    isEmailVerified: true,
                    isMobileVerified: false,
                    role: requestedRole,
                    password,
                    isActive: true,
                    registeredVia: 'Email',
                    platform: 'APP'
                }),
                () => ValidateOtpService.perform({
                    emailOrMobile: email, otp
                })
            )(),
            () => Result.Error(new ValidationError(0, `Email is already registered.'`))
        )(),
        () => db.findOne(new GetUserUsingEmailQuery(email)),
        () => CreateOtpUserSignupValidator.validate({
            name, email, password
        })
    )();

    return respond(response, 'Successfully validated signup otp !', 'Failed to validate signup otp !');
}

Route.withSecurity().authorize(hasPermission([ROLE.TEMPORARY_USER])).post('/api/v1/signup-validate-otps', post).bind();
