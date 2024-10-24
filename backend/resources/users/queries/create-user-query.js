const Models = require('models');

module.exports = class CreateUserQuery {
    constructor(userId, userDetails) {
        this.details = {
            userId, userDetails
        };
    }

    async get() {
        console.log('this.details', this.details);
        return Models.User.create({
            id: this.details.userId,
            ...this.details.userDetails
        });
    }
};
