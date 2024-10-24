const Route = require('route');
const {
    respond, composeResult, logInfo, numeric, ValidationError, token, HTTP_CONSTANT
} = require('core');
const db = require('db/repository');
const R = require('ramda');
const Result = require('folktale/result');
const CreateSessionValidator = require('resources/sessions/validators/create-session-validator');
const GetUserForSessionQuery = require('resources/users/queries/get-user-for-session-query');
const { ValidateBcryptString } = require('utils');

const generateToken = dbResult => composeResult(
    generatedToken => Result.Ok({
        id: dbResult.id,
        email: dbResult.email,
        mobile: dbResult.mobile,
        token: generatedToken,
        roles: dbResult.userRoles.map(role => role.name)
    }),
    () => token.generate({
        id: dbResult.id,
        email: dbResult.email,
        mobile: dbResult.mobile,
        roles: dbResult.userRoles.map(role => role.name)
    })
)();

const validatePassword = (dbResult, email, password) => composeResult(
    isValidated => R.ifElse(
        () => isValidated,
        () => generateToken(dbResult),
        () => Result.Error(new ValidationError(HTTP_CONSTANT.BAD_REQUEST, `Invalid Email/Password!`))
    )(),
    () => ValidateBcryptString.perform({
        string: password, salt: dbResult.salt, hashedString: dbResult.password
    })
)();

const checkAndValidate = (dbResult, email, password) => R.ifElse(
    () => R.isNil(dbResult),
    () => Result.Error(new ValidationError(HTTP_CONSTANT.BAD_REQUEST, `Invalid Email !`)),
    () => validatePassword(dbResult, email, password),
)();

async function post(req) {
    const { email, password } = req.body;

    logInfo('Request to create session', {
        email
    });

    const response = await composeResult(
        () => composeResult(
            dbResult => checkAndValidate(dbResult, email, password),
            () => db.find(new GetUserForSessionQuery(email))
        )(),
        () => CreateSessionValidator.validate({
            email, password
        })
    )();

    return respond(response, 'Successfully created session !', 'Failed to create session !');
}

Route.withOutSecurity().noAuth().post('/api/v1/sessions', post).bind();