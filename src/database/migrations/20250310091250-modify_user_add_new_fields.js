'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'otp', {
      type: Sequelize.STRING(6),
      allowNull: true,
      after: 'user_status',
    });

    await queryInterface.addColumn('users', 'otp_expired_at', {
      type: Sequelize.DATE,
      allowNull: true,
      after: 'otp',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'otp');
    await queryInterface.removeColumn('users', 'otp_expired_at');
  },
};
