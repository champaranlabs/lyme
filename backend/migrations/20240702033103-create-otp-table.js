module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Otps', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      purpose: {
        type: Sequelize.STRING,
        allowNull: false
      },
      otpSendOn: {
        type: Sequelize.ENUM('Mobile', 'Email'),
        allowNull: false
      },
      emailOrMobile: {
        type: Sequelize.STRING,
        allowNull: false
      },
      otp: {
        type: Sequelize.STRING,
        allowNull: false
      },
      expireAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      attemptCount: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Otps');
  }
};
