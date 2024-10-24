const { Model } = require('sequelize');
const { isEmail, isMobileNumber } = require('core');

module.exports = (sequelize, DataTypes) => {
    class Otp extends Model {

    }
    Otp.init({
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        purpose: {
            type: DataTypes.STRING,
            allowNull: false
        },
        otpSendOn: {
            type: DataTypes.ENUM('Mobile', 'Email'),
            allowNull: false
        },
        emailOrMobile: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmailOrMobile() {
                    if (!isEmail(this.emailOrMobile) && !isMobileNumber(this.emailOrMobile)) {
                        throw new Error('Email or Mobile is required.');
                    }
                }
            }
        },
        otp: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expireAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        attemptCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Otp'
    });
    return Otp;
};
