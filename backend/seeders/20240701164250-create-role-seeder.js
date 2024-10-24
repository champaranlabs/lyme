

const uuid = require('uuid');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Roles', [
      {
        id: uuid.v4(), name: 'Admin', description: 'Administrator related privileges', createdAt: new Date(), updatedAt: new Date()
      },
      {
        id: uuid.v4(), name: 'User', description: 'User related privileges', createdAt: new Date(), updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};