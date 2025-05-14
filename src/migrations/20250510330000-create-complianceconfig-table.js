'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ComplianceConfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gdprEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      dataRetentionPeriod: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 730 // 2 ans
      },
      anonymizeAfterRetention: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      requireConsent: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      consentText: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      privacyPolicyUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      logSensitiveDataAccess: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      encryptSensitiveData: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      dataBreachNotification: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      dataBreachEmails: {
        type: Sequelize.JSON,
        allowNull: true
      },
      hipaaCompliance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      pciDssCompliance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      soxCompliance: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('ComplianceConfigs');
  }
};
