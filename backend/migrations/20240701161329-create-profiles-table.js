module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'userId'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ageRange: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sex: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ethnicity: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Profiles');
  }
};