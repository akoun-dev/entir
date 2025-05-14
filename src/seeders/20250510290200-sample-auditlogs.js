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
    
    // Créer des exemples de journaux d'audit
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(now);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    
    await queryInterface.bulkInsert('AuditLogs', [
      {
        timestamp: now,
        userId: adminId,
        action: 'login',
        targetType: 'system',
        targetId: null,
        targetDescription: 'Système',
        details: 'Connexion réussie',
        severity: 'low',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        status: 'success'
      },
      {
        timestamp: yesterday,
        userId: regularUserId,
        action: 'data_change',
        targetType: 'user',
        targetId: regularUserId ? regularUserId.toString() : '123',
        targetDescription: 'Utilisateur #' + (regularUserId || '123'),
        details: 'Modification du profil utilisateur',
        severity: 'medium',
        ipAddress: '192.168.1.2',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        status: 'success'
      },
      {
        timestamp: twoDaysAgo,
        userId: adminId,
        action: 'permission_change',
        targetType: 'user',
        targetId: regularUserId ? regularUserId.toString() : '456',
        targetDescription: 'Utilisateur #' + (regularUserId || '456'),
        details: 'Changement de rôle utilisateur',
        severity: 'high',
        ipAddress: '192.168.1.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        status: 'success'
      },
      {
        timestamp: twoDaysAgo,
        userId: null,
        action: 'security_event',
        targetType: 'system',
        targetId: null,
        targetDescription: 'Système',
        details: 'Tentative de connexion échouée',
        severity: 'high',
        ipAddress: '203.0.113.1',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        status: 'failure'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AuditLogs', null, {});
  }
};
