'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Printers', {
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
      connection: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      port: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      driver: {
        type: Sequelize.STRING,
        allowNull: true
      },
      options: {
        type: Sequelize.JSON,
        allowNull: true
      },
      isDefault: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'active'
      },
      capabilities: {
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

    // Ajouter un index sur isDefault pour accélérer les recherches
    await queryInterface.addIndex('Printers', ['isDefault']);
    // Ajouter un index sur status pour accélérer les recherches
    await queryInterface.addIndex('Printers', ['status']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Printers');
  }
};
