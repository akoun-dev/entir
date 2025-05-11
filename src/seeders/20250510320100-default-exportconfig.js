'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ExportConfigs', [
      {
        availableFormats: JSON.stringify(['csv', 'xlsx', 'xml', 'json', 'pdf']),
        defaultFormat: 'xlsx',
        defaultDelimiter: ',',
        defaultEncoding: 'UTF-8',
        includeHeaders: true,
        maxRows: 100000,
        tempDirectory: '/tmp/exports',
        compressExports: true,
        dateFormat: 'YYYY-MM-DD',
        emailNotifications: true,
        notificationEmails: JSON.stringify(['admin@example.com', 'export@example.com']),
        advancedSettings: JSON.stringify({
          excelSheetName: 'Exported Data',
          pdfPageSize: 'A4',
          pdfOrientation: 'landscape',
          pdfTemplate: 'default',
          jsonPrettyPrint: true,
          xmlRootElement: 'data',
          xmlRowElement: 'record',
          includeTimestamp: true,
          includeMetadata: true
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ExportConfigs', null, {});
  }
};
