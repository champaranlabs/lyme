const {
    composeResult, logInfo, uuid
} = require('core');
const Result = require('folktale/result');
const db = require('db/repository');
const { GenerateRandomString, BcryptString } = require('utils');
const CreateUserQuery = require('resources/users/queries/create-user-query');
const CreateUserRoleQuery = require('resources/users/queries/create-user-role-query');
const GetRoleByNameQuery = require('resources/roles/queries/get-role-by-name-query');
const CreateProfileQuery = require('resources/profiles/queries/create-profile-query');

module.exports.perform = async ({
    email,
    mobile,
    name,
    isEmailVerified,
    isMobileVerified,
    role,
    password,
    isActive,
    registeredVia,
    platform
}) => {
    const userId = uuid.v4();
    const userRoleId = uuid.v4();
    const profileId = uuid.v4();
    const salt = GenerateRandomString(8);
    logInfo('Request to create user and assign role', {
        email,
        mobile,
        name,
        isEmailVerified,
        isMobileVerified,
        role,
        isActive,
        registeredVia,
        platform
    });
    return composeResult(
        dbRole => composeResult(
            user => composeResult(
                () => Result.Ok({ user, role: dbRole }),
                () => db.find(new CreateProfileQuery(profileId, {
                    name, email, userId
                })),
                () => db.execute(new CreateUserRoleQuery(userRoleId, {
                    roleId: dbRole.id,
                    userId: user.id
                }))
            )(),
            hashedPassword => db.execute(new CreateUserQuery(userId, {
                email,
                mobile,
                isEmailVerified,
                isMobileVerified,
                role,
                password: hashedPassword,
                isActive,
                registerVia: registeredVia,
                platform
            })),
            () => BcryptString.perform({ string: password, salt })
        )(),
        () => db.findOne(new GetRoleByNameQuery(role))
    )();
};
