'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AuditLogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timestamp: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
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
      action: {
        type: Sequelize.STRING,
        allowNull: false
      },
      targetType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      targetId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      targetDescription: {
        type: Sequelize.STRING,
        allowNull: true
      },
      details: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      severity: {
        type: Sequelize.ENUM('low', 'medium', 'high'),
        allowNull: false,
        defaultValue: 'low'
      },
      ipAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      userAgent: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('success', 'failure'),
        allowNull: false,
        defaultValue: 'success'
      }
    });

    // Ajouter des index pour améliorer les performances des requêtes
    await queryInterface.addIndex('AuditLogs', ['timestamp'], {
      name: 'audit_log_timestamp_idx'
    });
    await queryInterface.addIndex('AuditLogs', ['userId'], {
      name: 'audit_log_user_id_idx'
    });
    await queryInterface.addIndex('AuditLogs', ['action'], {
      name: 'audit_log_action_idx'
    });
    await queryInterface.addIndex('AuditLogs', ['targetType', 'targetId'], {
      name: 'audit_log_target_idx'
    });
    await queryInterface.addIndex('AuditLogs', ['severity'], {
      name: 'audit_log_severity_idx'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AuditLogs');
  }
};
