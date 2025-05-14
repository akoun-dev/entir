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
    
    // Créer des exemples de sauvegardes
    const now = new Date();
    
    // Dates pour les sauvegardes
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(2, 0, 0, 0);
    
    const twoDaysAgo = new Date(now);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    twoDaysAgo.setHours(2, 0, 0, 0);
    
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    threeDaysAgo.setHours(2, 0, 0, 0);
    
    const fourDaysAgo = new Date(now);
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
    fourDaysAgo.setHours(14, 30, 0, 0);
    
    // Dates d'expiration
    const expiresIn30Days = new Date(yesterday);
    expiresIn30Days.setDate(expiresIn30Days.getDate() + 30);
    
    const expiresIn29Days = new Date(twoDaysAgo);
    expiresIn29Days.setDate(expiresIn29Days.getDate() + 30);
    
    const expiresIn28Days = new Date(threeDaysAgo);
    expiresIn28Days.setDate(expiresIn28Days.getDate() + 30);
    
    const expiresIn27Days = new Date(fourDaysAgo);
    expiresIn27Days.setDate(expiresIn27Days.getDate() + 30);
    
    await queryInterface.bulkInsert('Backups', [
      {
        name: 'backup_20230615_020000',
        timestamp: yesterday,
        type: 'auto',
        size: 1024 * 1024 * 50, // 50 MB
        storageLocation: 'both',
        localPath: '/var/backups/app/backup_20230615_020000.zip',
        cloudPath: 's3://app-backups/daily/backup_20230615_020000.zip',
        status: 'success',
        errorDetails: null,
        userId: null,
        encrypted: true,
        encryptionKeyId: 'key-1',
        content: JSON.stringify({
          tables: ['Users', 'Groups', 'Parameters', 'AuditLogs'],
          files: ['uploads', 'config']
        }),
        checksum: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        expiresAt: expiresIn30Days,
        restored: false,
        restoredAt: null,
        restoredByUserId: null
      },
      {
        name: 'backup_20230614_020000',
        timestamp: twoDaysAgo,
        type: 'auto',
        size: 1024 * 1024 * 48, // 48 MB
        storageLocation: 'both',
        localPath: '/var/backups/app/backup_20230614_020000.zip',
        cloudPath: 's3://app-backups/daily/backup_20230614_020000.zip',
        status: 'success',
        errorDetails: null,
        userId: null,
        encrypted: true,
        encryptionKeyId: 'key-1',
        content: JSON.stringify({
          tables: ['Users', 'Groups', 'Parameters', 'AuditLogs'],
          files: ['uploads', 'config']
        }),
        checksum: 'sha256:a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
        expiresAt: expiresIn29Days,
        restored: false,
        restoredAt: null,
        restoredByUserId: null
      },
      {
        name: 'backup_20230613_020000',
        timestamp: threeDaysAgo,
        type: 'auto',
        size: 1024 * 1024 * 47, // 47 MB
        storageLocation: 'both',
        localPath: '/var/backups/app/backup_20230613_020000.zip',
        cloudPath: 's3://app-backups/daily/backup_20230613_020000.zip',
        status: 'success',
        errorDetails: null,
        userId: null,
        encrypted: true,
        encryptionKeyId: 'key-1',
        content: JSON.stringify({
          tables: ['Users', 'Groups', 'Parameters', 'AuditLogs'],
          files: ['uploads', 'config']
        }),
        checksum: 'sha256:b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3',
        expiresAt: expiresIn28Days,
        restored: false,
        restoredAt: null,
        restoredByUserId: null
      },
      {
        name: 'backup_manual_20230612_143000',
        timestamp: fourDaysAgo,
        type: 'manual',
        size: 1024 * 1024 * 52, // 52 MB
        storageLocation: 'local',
        localPath: '/var/backups/app/backup_manual_20230612_143000.zip',
        cloudPath: null,
        status: 'success',
        errorDetails: null,
        userId: adminId,
        encrypted: true,
        encryptionKeyId: 'key-1',
        content: JSON.stringify({
          tables: ['Users', 'Groups', 'Parameters', 'AuditLogs'],
          files: ['uploads', 'config']
        }),
        checksum: 'sha256:c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4',
        expiresAt: expiresIn27Days,
        restored: true,
        restoredAt: threeDaysAgo,
        restoredByUserId: adminId
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Backups', null, {});
  }
};
