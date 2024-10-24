
const Models = require('models');

module.exports = class CreateOtpQuery {
  constructor(otpId, otpDetails) {
    this.details = {
      otpId, otpDetails
    };
  }

  get() {
    return Models.Otp.create({
      id: this.details.otpId,
      otpSendOn: this.details.otpDetails.otpSendOn,
      purpose: this.details.otpDetails.purpose,
      emailOrMobile: this.details.otpDetails.emailOrMobile,
      otp: this.details.otpDetails.otp,
      expireAt: this.details.otpDetails.expireAt,
      attemptCount: this.details.otpDetails.attemptCount
    });
  }
};
