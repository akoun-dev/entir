'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NumberFormats', {
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
      decimal_separator: {
        type: Sequelize.STRING,
        allowNull: false
      },
      thousands_separator: {
        type: Sequelize.STRING,
        allowNull: true
      },
      decimal_places: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2
      },
      currency_display: {
        type: Sequelize.ENUM('symbol', 'code', 'name'),
        allowNull: false,
        defaultValue: 'symbol'
      },
      is_default: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      active: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('NumberFormats');
  }
};
