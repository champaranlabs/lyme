const Models = require('models');

module.exports = class CreateProfileQuery {
    constructor(profileId, profileDetails) {
        this.details = {
            profileId, profileDetails
        };
    }

    async get() {
        return Models.Profile.create({
            id: this.details.profileId,
            ...this.details.profileDetails
        });
    }
};
