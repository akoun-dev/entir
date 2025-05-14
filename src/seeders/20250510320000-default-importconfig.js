'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ImportConfigs', [
      {
        allowedFormats: JSON.stringify(['csv', 'xlsx', 'xml', 'json']),
        maxFileSize: 10485760, // 10 MB
        defaultDelimiter: ',',
        defaultEncoding: 'UTF-8',
        validateBeforeImport: true,
        ignoreErrors: false,
        maxRows: 100000,
        tempDirectory: '/tmp/imports',
        emailNotifications: true,
        notificationEmails: JSON.stringify(['admin@example.com', 'import@example.com']),
        advancedSettings: JSON.stringify({
          headerRow: true,
          skipEmptyRows: true,
          trimWhitespace: true,
          dateFormat: 'YYYY-MM-DD',
          numberFormat: '#,##0.00',
          booleanTrueValues: ['true', 'yes', '1'],
          booleanFalseValues: ['false', 'no', '0']
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ImportConfigs', null, {});
  }
};
