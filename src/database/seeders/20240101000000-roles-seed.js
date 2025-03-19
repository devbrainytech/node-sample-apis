'use strict';

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert('roles', [
      {
        roles: 'Administrator',
        permissions: JSON.stringify(['read', 'write']),
        updated_at: new Date(),
      },
      {
        roles: 'Staffer',
        permissions: JSON.stringify(['read']),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('roles', {});
  },
};
