'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NotificationConfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      emailEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      smsEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      inAppEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      webhookEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      maxRetries: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3
      },
      retryDelay: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 15
      },
      retentionPeriod: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 90
      },
      maxNotificationsPerDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 50
      },
      batchingEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      batchingInterval: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 15
      },
      advancedSettings: {
        type: Sequelize.JSON,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NotificationConfigs');
  }
};
