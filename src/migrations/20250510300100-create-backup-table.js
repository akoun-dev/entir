'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Backups', {
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
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      type: {
        type: Sequelize.ENUM('auto', 'manual'),
        allowNull: false,
        defaultValue: 'auto'
      },
      size: {
        type: Sequelize.BIGINT,
        allowNull: true
      },
      storageLocation: {
        type: Sequelize.ENUM('local', 'cloud', 'both'),
        allowNull: false
      },
      localPath: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cloudPath: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('success', 'failure', 'in_progress'),
        allowNull: false,
        defaultValue: 'in_progress'
      },
      errorDetails: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      encrypted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      encryptionKeyId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      content: {
        type: Sequelize.JSON,
        allowNull: true
      },
      checksum: {
        type: Sequelize.STRING,
        allowNull: true
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      restored: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      restoredAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      restoredByUserId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    // Ajouter des index pour améliorer les performances des requêtes
    await queryInterface.addIndex('Backups', ['timestamp'], {
      name: 'backup_timestamp_idx'
    });
    await queryInterface.addIndex('Backups', ['status'], {
      name: 'backup_status_idx'
    });
    await queryInterface.addIndex('Backups', ['type'], {
      name: 'backup_type_idx'
    });
    await queryInterface.addIndex('Backups', ['expiresAt'], {
      name: 'backup_expires_at_idx'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Backups');
  }
};
