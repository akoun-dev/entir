'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ExternalServices', {
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
      baseUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      config: {
        type: Sequelize.JSON,
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
      authInfo: {
        type: Sequelize.JSON,
        allowNull: true
      },
      tokenExpiry: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lastSyncStatus: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastSyncDate: {
        type: Sequelize.DATE,
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
    await queryInterface.addIndex('ExternalServices', ['isActive']);
    // Ajouter un index sur type pour accélérer les recherches
    await queryInterface.addIndex('ExternalServices', ['type']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ExternalServices');
  }
};
