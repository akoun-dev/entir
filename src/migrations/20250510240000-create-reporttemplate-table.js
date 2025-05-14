'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReportTemplates', {
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
      category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      content: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      format: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'PDF'
      },
      parameters: {
        type: Sequelize.JSON,
        allowNull: true
      },
      query: {
        type: Sequelize.TEXT,
        allowNull: true
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
      isShared: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      requiredPermissions: {
        type: Sequelize.JSON,
        allowNull: true
      },
      scheduleFrequency: {
        type: Sequelize.STRING,
        allowNull: true
      },
      scheduleCron: {
        type: Sequelize.STRING,
        allowNull: true
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

    // Ajouter un index sur la catégorie pour accélérer les recherches
    await queryInterface.addIndex('ReportTemplates', ['category']);
    // Ajouter un index sur le statut pour accélérer les recherches
    await queryInterface.addIndex('ReportTemplates', ['status']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ReportTemplates');
  }
};
