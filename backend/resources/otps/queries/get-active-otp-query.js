const dayjs = require('utils/dayjs');
const Models = require('models');
const { Op } = require('sequelize');

module.exports = class GetActiveOtpQuery {
  constructor(emailOrMobile) {
    this.details = {
      emailOrMobile
    };
  }

  get() {
    return Models.Otp.findOne({
      where: {
        isVerified: false,
        expireAt: {
          [Op.gte]: dayjs().format()
        },
        emailOrMobile: this.details.emailOrMobile,
        attemptCount: {
          [Op.gt]: 0
        }
      }
    });
  }
};
