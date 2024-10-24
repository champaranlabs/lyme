
require('app-module-path').addPath(`${__dirname}/../`);
const models = require('models');
const { whenResult } = require('core');
const uuid = require('uuid');
const { GenerateRandomString, BcryptString } = require('utils');

module.exports = {
  up: async (queryInterface) => {
    const role = await models.Role.findOne({
      where: {
        name: 'User'
      }
    });
    const salt = GenerateRandomString(8);
    const adminId = uuid.v4();
    const hashedString = await BcryptString.perform({ string: 'energy', salt });
    const password = await whenResult(result => result)(hashedString);
    await queryInterface.bulkInsert('Users', [
      {
        id: adminId,
        registerVia: 'Email',
        isEmailVerified: true,
        isActive: true,
        email: 'satish@lyme.com',
        salt,
        password,
        platform: 'APP',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    await queryInterface.bulkInsert('UserRoles', [
      {
        id: uuid.v4(),
        userId: adminId,
        roleId: role.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    await queryInterface.bulkInsert('Profiles', [
      {
        id: uuid.v4(),
        userId: adminId,
        name: 'Satish',
        email: 'satish@lyme.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface) => {
    const role = await models.Role.findOne({
      where: {
        name: 'User'
      }
    });
    await queryInterface.bulkDelete('UserRoles', {
      roleId: role.id
    }, {});
    await queryInterface.bulkDelete('Users', {
      email: 'admin@fzta.in'
    }, {});
    await queryInterface.bulkDelete('Profiles', {
      email: 'admin@fzta.in'
    }, {});
  }
};