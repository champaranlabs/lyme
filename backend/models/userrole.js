

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {

  }
  UserRole.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      }
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Roles',
        key: 'id',
        as: 'roleId'
      }
    }
  }, {
    sequelize,
    modelName: 'UserRole'
  });
  return UserRole;
};
