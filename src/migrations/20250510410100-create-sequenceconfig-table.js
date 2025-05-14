'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SequenceConfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fiscalYearStart: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '01-01'
      },
      fiscalYearEnd: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '12-31'
      },
      defaultFormat: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'prefix-number-year'
      },
      defaultPadding: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5
      },
      autoReset: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.dropTable('SequenceConfigs');
  }
};
