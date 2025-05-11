'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NotificationPreferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      eventType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      enabledChannels: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: []
      },
      frequency: {
        type: Sequelize.ENUM('immediate', 'daily', 'weekly'),
        allowNull: false,
        defaultValue: 'immediate'
      },
      preferredTime: {
        type: Sequelize.TIME,
        allowNull: true
      },
      preferredDay: {
        type: Sequelize.ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
        allowNull: true
      },
      enabled: {
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

    // Ajouter un index unique pour éviter les doublons
    await queryInterface.addIndex('NotificationPreferences', ['userId', 'eventType'], {
      unique: true,
      name: 'notification_preference_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NotificationPreferences');
  }
};
