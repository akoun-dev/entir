'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NotificationTemplateChannels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      templateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'NotificationTemplates',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      channelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'NotificationChannels',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.addIndex('NotificationTemplateChannels', ['templateId', 'channelId'], {
      unique: true,
      name: 'notification_template_channel_unique'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NotificationTemplateChannels');
  }
};
