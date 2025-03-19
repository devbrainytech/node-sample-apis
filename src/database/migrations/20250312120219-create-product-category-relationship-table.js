'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('category_product_relationship', {
      product_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      category_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
    });

    await queryInterface.addIndex('category_product_relationship', ['product_id', 'category_id'], {
      name: 'idx_category_product',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('category_product_relationship');
  },
};
