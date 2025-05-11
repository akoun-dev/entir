'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ThemeConfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mode: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'light'
      },
      primaryColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '#3b82f6'
      },
      secondaryColor: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: '#10b981'
      },
      density: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'normal'
      },
      fontSize: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'medium'
      },
      highContrast: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      reducedMotion: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      dashboardLayout: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'default'
      },
      customCSS: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('ThemeConfigs');
  }
};
