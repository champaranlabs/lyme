const { Model } = require('sequelize');
const { isEmail, isMobileNumber } = require('core');

module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
        static associate(models) {
            // Profile.belongsTo(models.User, {
            //     foreignKey: 'userId',
            //     as: 'profileUser'
            // });
        }
    }
    Profile.init({
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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ageRange: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ethnicity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Profile'
    });
    return Profile;
};
