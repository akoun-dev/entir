'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Récupérer l'ID de l'utilisateur admin
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users WHERE username = "admin" OR email = "admin@example.com" LIMIT 1',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const adminId = users.length > 0 ? users[0].id : null;
    
    // Récupérer l'ID d'un utilisateur standard
    const regularUsers = await queryInterface.sequelize.query(
      'SELECT id FROM Users WHERE username != "admin" AND email != "admin@example.com" LIMIT 1',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const regularUserId = regularUsers.length > 0 ? regularUsers[0].id : null;
    
    // Créer des exemples d'historique d'import/export
    const now = new Date();
    
    // Dates pour les opérations
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const twoDaysAgo = new Date(now);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    
    const fourDaysAgo = new Date(now);
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
    
    const fiveDaysAgo = new Date(now);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);
    
    await queryInterface.bulkInsert('ImportExportHistories', [
      {
        operationType: 'import',
        timestamp: yesterday,
        userId: adminId,
        dataType: 'users',
        fileFormat: 'csv',
        fileName: 'users_import.csv',
        fileSize: 1024 * 50, // 50 KB
        recordCount: 100,
        status: 'success',
        errorDetails: null,
        duration: 5,
        parameters: JSON.stringify({
          delimiter: ',',
          encoding: 'UTF-8',
          headerRow: true
        }),
        filePath: '/tmp/imports/users_import.csv',
        expiresAt: null,
        createdAt: yesterday,
        updatedAt: yesterday
      },
      {
        operationType: 'export',
        timestamp: twoDaysAgo,
        userId: adminId,
        dataType: 'products',
        fileFormat: 'xlsx',
        fileName: 'products_export.xlsx',
        fileSize: 1024 * 100, // 100 KB
        recordCount: 250,
        status: 'success',
        errorDetails: null,
        duration: 8,
        parameters: JSON.stringify({
          includeHeaders: true,
          sheetName: 'Products'
        }),
        filePath: '/tmp/exports/products_export.xlsx',
        expiresAt: new Date(twoDaysAgo.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 jours après l'export
        createdAt: twoDaysAgo,
        updatedAt: twoDaysAgo
      },
      {
        operationType: 'import',
        timestamp: threeDaysAgo,
        userId: regularUserId,
        dataType: 'customers',
        fileFormat: 'json',
        fileName: 'customers_import.json',
        fileSize: 1024 * 75, // 75 KB
        recordCount: 50,
        status: 'partial',
        errorDetails: 'Certains enregistrements n\'ont pas pu être importés en raison de données manquantes',
        duration: 4,
        parameters: JSON.stringify({
          validateBeforeImport: true
        }),
        filePath: '/tmp/imports/customers_import.json',
        expiresAt: null,
        createdAt: threeDaysAgo,
        updatedAt: threeDaysAgo
      },
      {
        operationType: 'export',
        timestamp: fourDaysAgo,
        userId: regularUserId,
        dataType: 'orders',
        fileFormat: 'csv',
        fileName: 'orders_export.csv',
        fileSize: 1024 * 120, // 120 KB
        recordCount: 300,
        status: 'success',
        errorDetails: null,
        duration: 10,
        parameters: JSON.stringify({
          delimiter: ',',
          includeHeaders: true,
          dateFormat: 'YYYY-MM-DD'
        }),
        filePath: '/tmp/exports/orders_export.csv',
        expiresAt: new Date(fourDaysAgo.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 jours après l'export
        createdAt: fourDaysAgo,
        updatedAt: fourDaysAgo
      },
      {
        operationType: 'import',
        timestamp: fiveDaysAgo,
        userId: adminId,
        dataType: 'inventory',
        fileFormat: 'xlsx',
        fileName: 'inventory_import.xlsx',
        fileSize: 1024 * 200, // 200 KB
        recordCount: 0,
        status: 'failed',
        errorDetails: 'Format de fichier invalide ou corrompu',
        duration: 2,
        parameters: JSON.stringify({
          sheetName: 'Inventory'
        }),
        filePath: '/tmp/imports/inventory_import.xlsx',
        expiresAt: null,
        createdAt: fiveDaysAgo,
        updatedAt: fiveDaysAgo
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ImportExportHistories', null, {});
  }
};
