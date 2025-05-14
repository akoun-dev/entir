'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AutomationRules', {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      trigger_type: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'cron'
      },
      trigger_value: {
        type: Sequelize.STRING,
        allowNull: false
      },
      action_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      action_params: {
        type: Sequelize.JSON,
        allowNull: true
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      priority: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100
      },
      last_run: {
        type: Sequelize.DATE,
        allowNull: true
      },
      last_status: {
        type: Sequelize.STRING,
        allowNull: true
      },
      success_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      failure_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable('AutomationRules');
  }
};
