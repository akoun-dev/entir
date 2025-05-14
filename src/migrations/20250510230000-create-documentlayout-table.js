'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DocumentLayouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      metadata: {
        type: Sequelize.JSON,
        allowNull: true
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      orientation: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'portrait'
      },
      paperSize: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'A4'
      },
      margins: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: { top: 10, right: 10, bottom: 10, left: 10 }
      },
      previewUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Ajouter un index sur le type et isDefault pour accélérer les recherches
    await queryInterface.addIndex('DocumentLayouts', ['type', 'isDefault']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DocumentLayouts');
  }
};
