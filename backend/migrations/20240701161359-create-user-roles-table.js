module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRoles', {
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
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
          as: 'roleId'
        }
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
    await queryInterface.addConstraint('UserRoles', {
      type: 'unique',
      name: 'userId_roleId_unique_constraint',
      fields: ['userId', 'roleId']
    });
  },
  async down(queryInterface) {
    await queryInterface.removeConstraint('UserRoles', 'userId_roleId_unique_constraint');
    await queryInterface.dropTable('UserRoles');
  }
};