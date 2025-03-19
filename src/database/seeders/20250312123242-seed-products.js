'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Product 1',
        slug: 'product-1',
        sku: 'SKU001',
        price: 10.0,
        stock: 100,
        stock_status: 'in_stock',
        status: 'publish',
        description: 'Description for product 1',
        short_description: 'Short description for product 1',
        type: 'product',
        meta_title: 'Meta title for product 1',
        meta_description: 'Meta description for product 1',
        meta_keywords: 'Meta keywords for product 1',
      },
      {
        name: 'Product 2',
        slug: 'product-2',
        sku: 'SKU002',
        price: 20.0,
        stock: 50,
        stock_status: 'in_stock',
        status: 'publish',
        description: 'Description for product 2',
        short_description: 'Short description for product 2',
        type: 'product',
        meta_title: 'Meta title for product 2',
        meta_description: 'Meta description for product 2',
        meta_keywords: 'Meta keywords for product 2',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', {});
  },
};
