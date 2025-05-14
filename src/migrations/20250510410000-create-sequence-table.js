'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sequences', {
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
      prefix: {
        type: Sequelize.STRING,
        allowNull: true
      },
      suffix: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nextNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      padding: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5
      },
      resetFrequency: {
        type: Sequelize.ENUM('never', 'yearly', 'monthly'),
        allowNull: false,
        defaultValue: 'never'
      },
      documentType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastReset: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('Sequences');
  }
};
