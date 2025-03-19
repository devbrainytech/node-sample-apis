'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('category_product_relationship', [
      {
        product_id: 1,
        category_id: 1,
      },
      {
        product_id: 2,
        category_id: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category_product_relationship', {});
  },
};
