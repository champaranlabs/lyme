

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    static associate(models) {
      Role.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: 'roleId',
        as: 'roleUsers'
      });
    }
  }
  Role.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Role'
  });
  return Role;
};
