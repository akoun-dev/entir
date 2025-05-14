'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PerformanceConfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cacheEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      cacheSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 500
      },
      cacheTTL: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3600
      },
      defaultPageSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 25
      },
      queryOptimization: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      responseCompression: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      loggingLevel: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'info'
      },
      requestTimeout: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 30
      },
      maxDbConnections: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10
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
    await queryInterface.dropTable('PerformanceConfigs');
  }
};
