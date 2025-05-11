'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentProviders', {
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
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      apiKey: {
        type: Sequelize.STRING,
        allowNull: true
      },
      apiSecret: {
        type: Sequelize.STRING,
        allowNull: true
      },
      config: {
        type: Sequelize.JSON,
        allowNull: true
      },
      fees: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      mode: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'test'
      },
      webhookUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      supportedMethods: {
        type: Sequelize.JSON,
        allowNull: true
      },
      supportedCurrencies: {
        type: Sequelize.JSON,
        allowNull: true
      },
      supportedCountries: {
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

    // Ajouter un index sur isActive pour accélérer les recherches
    await queryInterface.addIndex('PaymentProviders', ['isActive']);
    // Ajouter un index sur type pour accélérer les recherches
    await queryInterface.addIndex('PaymentProviders', ['type']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PaymentProviders');
  }
};
