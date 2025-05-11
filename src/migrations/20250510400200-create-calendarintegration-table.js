'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CalendarIntegrations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      accessToken: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      refreshToken: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      tokenExpiry: {
        type: Sequelize.DATE,
        allowNull: true
      },
      syncSettings: {
        type: Sequelize.JSON,
        allowNull: true
      },
      lastSync: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lastSyncStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.dropTable('CalendarIntegrations');
  }
};
