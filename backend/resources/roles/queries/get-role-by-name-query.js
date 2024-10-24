const Models = require('models');

module.exports = class GetRoleByNameQuery {
    constructor(name) {
        this.details = {
            name
        };
    }

    async get() {
        return Models.Role.findOne({
            where: {
                name: this.details.name
            }
        });
    }
};
