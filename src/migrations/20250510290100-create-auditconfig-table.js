'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AuditConfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      retentionDays: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 90
      },
      logLevel: {
        type: Sequelize.ENUM('minimal', 'normal', 'verbose'),
        allowNull: false,
        defaultValue: 'normal'
      },
      monitoredEvents: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: ['login', 'data_change', 'permission_change']
      },
      alertEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      alertThreshold: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5
      },
      alertEmails: {
        type: Sequelize.JSON,
        allowNull: true
      },
      logSensitiveDataAccess: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      logDataChanges: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      logAuthentication: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      logPermissionChanges: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      logAdminActions: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.dropTable('AuditConfigs');
  }
};
