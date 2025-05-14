'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AuditConfigs', [
      {
        retentionDays: 90,
        logLevel: 'normal',
        monitoredEvents: JSON.stringify(['login', 'data_change', 'permission_change', 'admin_action', 'security_event']),
        alertEnabled: true,
        alertThreshold: 5,
        alertEmails: JSON.stringify(['admin@example.com', 'security@example.com']),
        logSensitiveDataAccess: true,
        logDataChanges: true,
        logAuthentication: true,
        logPermissionChanges: true,
        logAdminActions: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AuditConfigs', null, {});
  }
};
