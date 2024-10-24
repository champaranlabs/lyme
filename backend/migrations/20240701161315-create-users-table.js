module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      registerVia: {
        type: Sequelize.ENUM('Mobile', 'Email', 'Google', 'Apple', 'Facebook'),
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      isBlock: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isMobileVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      mobile: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      platform: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Users');
  }
};