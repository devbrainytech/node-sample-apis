'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      stock_status: {
        type: Sequelize.ENUM('in_stock', 'out_of_stock'),
        allowNull: false,
        defaultValue: 'in_stock',
      },
      status: {
        type: Sequelize.ENUM('publish', 'draft', 'private', 'trash'),
        allowNull: false,
        defaultValue: 'draft',
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      short_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM('product', 'membership', 'session'),
        allowNull: false,
        defaultValue: 'product',
      },
      featured: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_global: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      meta_title: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      meta_description: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      meta_keywords: {
        type: Sequelize.STRING(1000),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex('products', ['price'], { name: 'idx_product_price' });
    await queryInterface.addIndex('products', ['status'], { name: 'idx_product_status' });
    await queryInterface.addIndex('products', ['created_at'], { name: 'idx_product_created' });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
};
