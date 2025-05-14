'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExportConfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      availableFormats: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify(['csv', 'xlsx', 'xml', 'json', 'pdf'])
      },
      defaultFormat: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'xlsx'
      },
      defaultDelimiter: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ','
      },
      defaultEncoding: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'UTF-8'
      },
      includeHeaders: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      maxRows: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 100000
      },
      tempDirectory: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '/tmp/exports'
      },
      compressExports: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      dateFormat: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'YYYY-MM-DD'
      },
      emailNotifications: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      notificationEmails: {
        type: Sequelize.JSON,
        allowNull: true
      },
      advancedSettings: {
        type: Sequelize.JSON,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExportConfigs');
  }
};
