const Models = require('models');

module.exports = class CreateUserRoleQuery {
    constructor(userRoleId, userRoleDetails) {
        this.details = {
            userRoleId, userRoleDetails
        };
    }

    async get() {
        return Models.UserRole.create({
            id: this.details.userRoleId,
            ...this.details.userRoleDetails
        });
    }
};
