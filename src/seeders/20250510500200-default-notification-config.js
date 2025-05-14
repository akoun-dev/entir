'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('NotificationConfigs', [
      {
        emailEnabled: true,
        smsEnabled: true,
        inAppEnabled: true,
        webhookEnabled: true,
        maxRetries: 3,
        retryDelay: 15,
        retentionPeriod: 90,
        maxNotificationsPerDay: 50,
        batchingEnabled: true,
        batchingInterval: 15,
        advancedSettings: JSON.stringify({
          emailThrottling: {
            enabled: true,
            maxPerHour: 100,
            maxPerDay: 500
          },
          smsThrottling: {
            enabled: true,
            maxPerHour: 20,
            maxPerDay: 100
          },
          prioritySettings: {
            highPriorityBypass: true,
            lowPriorityDelay: 60
          },
          deliveryHours: {
            enabled: true,
            start: '08:00',
            end: '20:00',
            timezone: 'Europe/Paris',
            respectWeekends: true
          },
          templates: {
            defaultLanguage: 'fr-FR',
            fallbackLanguage: 'en-US'
          }
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('NotificationConfigs', null, {});
  }
};
