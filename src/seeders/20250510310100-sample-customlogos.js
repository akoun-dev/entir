'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CustomLogos', [
      {
        type: 'main',
        filePath: '/uploads/logos/main-logo.png',
        originalFilename: 'company-logo.png',
        mimeType: 'image/png',
        fileSize: 24680,
        dimensions: '200x60',
        active: true,
        metadata: JSON.stringify({
          uploadedBy: 'admin',
          uploadDate: '2023-06-15T10:30:00Z'
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'small',
        filePath: '/uploads/logos/small-logo.png',
        originalFilename: 'company-icon.png',
        mimeType: 'image/png',
        fileSize: 12340,
        dimensions: '40x40',
        active: true,
        metadata: JSON.stringify({
          uploadedBy: 'admin',
          uploadDate: '2023-06-15T10:35:00Z'
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'favicon',
        filePath: '/uploads/logos/favicon.ico',
        originalFilename: 'favicon.ico',
        mimeType: 'image/x-icon',
        fileSize: 4560,
        dimensions: '16x16',
        active: true,
        metadata: JSON.stringify({
          uploadedBy: 'admin',
          uploadDate: '2023-06-15T10:40:00Z'
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: 'login',
        filePath: '/uploads/logos/login-logo.png',
        originalFilename: 'login-banner.png',
        mimeType: 'image/png',
        fileSize: 36920,
        dimensions: '400x120',
        active: true,
        metadata: JSON.stringify({
          uploadedBy: 'admin',
          uploadDate: '2023-06-15T10:45:00Z'
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CustomLogos', null, {});
  }
};
