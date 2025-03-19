'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_images', [
      {
        product_id: 1,
        image_url: 'https://example.com/image1.jpg',
        alt_text: 'Image 1',
        is_default: true,
      },
      {
        product_id: 2,
        image_url: 'https://example.com/image2.jpg',
        alt_text: 'Image 2',
        is_default: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_images', {});
  },
};
