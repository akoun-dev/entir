'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Calculer la date de la prochaine sauvegarde (demain à 2h du matin)
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(2, 0, 0, 0);
    
    // Calculer la date de la dernière sauvegarde (hier à 2h du matin)
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(2, 0, 0, 0);
    
    await queryInterface.bulkInsert('BackupConfigs', [
      {
        frequency: 'daily',
        backupTime: '02:00',
        weeklyDay: 0, // Dimanche
        monthlyDay: 1, // Premier jour du mois
        retention: 30,
        storageType: 'both',
        localPath: '/var/backups/app',
        cloudConfig: JSON.stringify({
          provider: 'aws',
          bucket: 'app-backups',
          region: 'eu-west-1',
          prefix: 'daily/'
        }),
        encryption: true,
        encryptionKey: 'encrypted_key_placeholder',
        lastBackup: yesterday,
        nextBackup: tomorrow,
        lastBackupStatus: 'success',
        lastFailureDetails: null,
        emailNotifications: true,
        notificationEmails: JSON.stringify(['admin@example.com', 'backup@example.com']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BackupConfigs', null, {});
  }
};
