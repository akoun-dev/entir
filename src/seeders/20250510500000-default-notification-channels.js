'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('NotificationChannels', [
      {
        name: 'Email principal',
        type: 'email',
        description: 'Notifications par email',
        config: JSON.stringify({
          useSmtp: true,
          smtpServer: 'smtp.example.com',
          smtpPort: 587,
          useTls: true,
          fromEmail: 'notifications@example.com',
          fromName: 'Système de notification'
        }),
        enabled: true,
        displayOrder: 1,
        icon: 'mail',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SMS professionnel',
        type: 'sms',
        description: 'Notifications par SMS',
        config: JSON.stringify({
          provider: 'twilio',
          accountSid: 'AC_EXAMPLE',
          authToken: 'AUTH_TOKEN_EXAMPLE',
          fromNumber: '+33600000000'
        }),
        enabled: true,
        displayOrder: 2,
        icon: 'smartphone',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Application',
        type: 'in_app',
        description: 'Notifications dans l\'application',
        config: JSON.stringify({
          maxNotifications: 100,
          autoDelete: true,
          deleteAfterDays: 30
        }),
        enabled: true,
        displayOrder: 3,
        icon: 'bell',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Webhook Slack',
        type: 'webhook',
        description: 'Notifications vers Slack',
        config: JSON.stringify({
          url: 'https://hooks.slack.com/services/EXAMPLE',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }),
        enabled: false,
        displayOrder: 4,
        icon: 'webhook',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('NotificationChannels', null, {});
  }
};
