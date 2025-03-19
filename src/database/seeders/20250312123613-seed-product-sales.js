'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_sales', [
      {
        product_id: 1,
        sale_price: 8.0,
        sale_start: new Date(),
        status: 'active',
      },
      {
        product_id: 2,
        sale_price: 15.0,
        sale_start: new Date(),
        status: 'active',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_sales', {});
  },
};
