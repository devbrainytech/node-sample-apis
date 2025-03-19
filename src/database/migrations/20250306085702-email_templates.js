'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('email_templates', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      body_content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      template_variables: {
        type: Sequelize.JSON,
        allowNull: true,
        comment: 'JSON array of variables used in template',
      },
      layout_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'email_layouts',
          key: 'id',
        },
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        comment: '1 for active, 0 for inactive',
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

    // Add indexes for better query performance
    await queryInterface.addIndex('email_templates', ['layout_id']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('email_templates');
  },
};
