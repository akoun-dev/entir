'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ShippingMethods', {
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
      carrier: {
        type: Sequelize.STRING,
        allowNull: false
      },
      deliveryTime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      pricingRules: {
        type: Sequelize.JSON,
        allowNull: true
      },
      availableCountries: {
        type: Sequelize.JSON,
        allowNull: true
      },
      maxWeight: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      maxDimensions: {
        type: Sequelize.JSON,
        allowNull: true
      },
      trackingInfo: {
        type: Sequelize.JSON,
        allowNull: true
      },
      displayOrder: {
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

    // Ajouter un index sur isActive pour accélérer les recherches
    await queryInterface.addIndex('ShippingMethods', ['isActive']);
    // Ajouter un index sur carrier pour accélérer les recherches
    await queryInterface.addIndex('ShippingMethods', ['carrier']);
    // Ajouter un index sur displayOrder pour accélérer les recherches
    await queryInterface.addIndex('ShippingMethods', ['displayOrder']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ShippingMethods');
  }
};
