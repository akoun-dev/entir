'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BackupConfigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      frequency: {
        type: Sequelize.ENUM('daily', 'weekly', 'monthly'),
        allowNull: false,
        defaultValue: 'daily'
      },
      backupTime: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '02:00'
      },
      weeklyDay: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      monthlyDay: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      retention: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 30
      },
      storageType: {
        type: Sequelize.ENUM('local', 'cloud', 'both'),
        allowNull: false,
        defaultValue: 'both'
      },
      localPath: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cloudConfig: {
        type: Sequelize.JSON,
        allowNull: true
      },
      encryption: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      encryptionKey: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastBackup: {
        type: Sequelize.DATE,
        allowNull: true
      },
      nextBackup: {
        type: Sequelize.DATE,
        allowNull: true
      },
      lastBackupStatus: {
        type: Sequelize.ENUM('success', 'failure', 'in_progress'),
        allowNull: true
      },
      lastFailureDetails: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      emailNotifications: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      notificationEmails: {
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
    await queryInterface.dropTable('BackupConfigs');
  }
};
