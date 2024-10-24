
const Models = require('models');

module.exports = class UpdateOtpQuery {
  constructor(otpId, otpDetails) {
    this.details = {
      otpId, otpDetails
    };
  }

  async get() {
    return Models.Otp.update({
      ...this.details.otpDetails
    }, {
      where: {
        id: this.details.otpId
      },
      returning: true
    });
  }
};
