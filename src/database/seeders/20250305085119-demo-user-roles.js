'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const user = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'brainytech@yopmail.com'`
    );
    const userId = user[0][0].id;

    return queryInterface.bulkInsert('users_roles', [
      {
        user_id: userId,
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users_roles', null, {});
  },
};
