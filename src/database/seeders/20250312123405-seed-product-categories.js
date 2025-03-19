'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_categories', [
      {
        name: 'Category 1',
        slug: 'category-1',
        meta_title: 'Meta title for category 1',
        meta_description: 'Meta description for category 1',
        meta_keywords: 'Meta keywords for category 1',
      },
      {
        name: 'Category 2',
        slug: 'category-2',
        meta_title: 'Meta title for category 2',
        meta_description: 'Meta description for category 2',
        meta_keywords: 'Meta keywords for category 2',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_categories', {});
  },
};
