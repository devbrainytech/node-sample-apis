'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_location_relationship', {
      product_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      location_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
    });

    await queryInterface.addIndex('product_location_relationship', ['product_id', 'location_id'], {
      name: 'idx_product_location',
    });

    await queryInterface.addConstraint('product_location_relationship', {
      fields: ['product_id'],
      type: 'foreign key',
      name: 'fk_product_location',
      references: {
        table: 'products',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('product_location_relationship', {
      fields: ['location_id'],
      type: 'foreign key',
      name: 'fk_location_product',
      references: {
        table: 'locations',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_location_relationship');
  },
};
