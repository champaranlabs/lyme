const { Model } = require('sequelize');
const { isEmail, isMobileNumber } = require('core');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: 'userId',
        as: 'userRoles'
      });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    registerVia: {
      type: DataTypes.ENUM('Mobile', 'Email', 'Google', 'Apple', 'Facebook'),
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isBlock: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isMobileVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isMobileOrEmailProvided() {
          if (!this.email && !this.mobile) {
            throw new Error('Email or Mobile is required.');
          }
          if (this.mobile && !isMobileNumber(this.mobile)) {
            throw new Error('Invalid mobile number.');
          }
        }
      }
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmailOrMobileProvided() {
          if (!this.email && !this.mobile) {
            throw new Error('Email or Mobile is required.');
          }
          if (this.email && !isEmail(this.email)) {
            throw new Error('Invalid email address.');
          }
        }
      }
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
