const Models = require('models');
const { numeric } = require('core');

module.exports = class GetUserUsingEmailQuery {
    constructor(email) {
        this.details = {
            email
        };
    }

    async get() {
        return Models.User.findOne({
            where: {
                email: this.details.email
            }
        });
    }
};
