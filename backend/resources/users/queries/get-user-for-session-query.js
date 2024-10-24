const Models = require('models');
const { numeric } = require('core');

module.exports = class GetUserForSessionQuery {
    constructor(email) {
        this.details = {
            email
        };
    }

    async get() {
        return Models.User.findOne({
            where: {
                email: this.details.email,
                isActive: true,
                isBlock: false
            },
            include: [
                {
                    model: Models.Role,
                    as: 'userRoles'
                }
            ]
        });
    }
};
