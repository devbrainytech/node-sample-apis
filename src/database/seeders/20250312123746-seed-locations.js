'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('locations', [
      {
        name: 'Location 1',
        slug: 'location-1',
        country: 'Country 1',
        state: 'State 1',
        city: 'City 1',
        zip_code: '12345',
        address: 'Address 1',
        latitude: 12.345678,
        longitude: 98.765432,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Location 2',
        slug: 'location-2',
        country: 'Country 2',
        state: 'State 2',
        city: 'City 2',
        zip_code: '67890',
        address: 'Address 2',
        latitude: 23.456789,
        longitude: 87.654321,
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('locations', {});
  },
};
