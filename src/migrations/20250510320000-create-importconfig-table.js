'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ImportConfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      allowedFormats: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: JSON.stringify(['csv', 'xlsx', 'xml', 'json'])
      },
      maxFileSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10485760 // 10 MB
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
      validateBeforeImport: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      ignoreErrors: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      maxRows: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      tempDirectory: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '/tmp/imports'
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
    await queryInterface.dropTable('ImportConfigs');
  }
};
