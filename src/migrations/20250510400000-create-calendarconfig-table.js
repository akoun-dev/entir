'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CalendarConfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timezone: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Europe/Paris'
      },
      workHoursStart: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '08:00'
      },
      workHoursEnd: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '18:00'
      },
      weekStart: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'monday'
      },
      dateFormat: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'YYYY-MM-DD'
      },
      timeFormat: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'HH:mm'
      },
      workDays: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
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
    await queryInterface.dropTable('CalendarConfigs');
  }
};
