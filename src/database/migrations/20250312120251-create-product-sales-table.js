'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_sales', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      sale_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      sale_start: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      sale_end: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(
          'active',
          'draft',
          'expired',
          'scheduled',
          'cancelled',
          'pending',
          'trash'
        ),
        allowNull: false,
        defaultValue: 'draft',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex('product_sales', ['status'], {
      name: 'idx_active_sales',
      where: { status: 'active' },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_sales');
  },
};
