'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('Admin@1234', 10);

    await queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'brainytech@yopmail.com',
        password: hashedPassword,
        first_name: 'Admin',
        last_name: 'User',
        display_name: 'Admin User',
        gender: 'male',
        date_of_birth: new Date('1980-01-01'),
        contact_no: '1234567890',
        driving_licance: 'DL123456',
        user_status: '1',
        user_registered: new Date(),
        otp: null,
        otp_expired_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
