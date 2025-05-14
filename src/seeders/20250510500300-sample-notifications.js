'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Récupérer les utilisateurs
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" LIMIT 2',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    // Si aucun utilisateur n'existe, ne pas créer de notifications
    if (users.length === 0) {
      console.log('Aucun utilisateur trouvé, les notifications d\'exemple ne seront pas créées.');
      return;
    }
    
    // Récupérer les modèles de notification
    const templates = await queryInterface.sequelize.query(
      'SELECT id, event FROM "NotificationTemplates"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    // Créer des notifications d'exemple
    const notifications = [];
    const now = new Date();
    
    // Notifications pour le premier utilisateur
    if (users[0]) {
      // Notification lue
      notifications.push({
        userId: users[0].id,
        templateId: templates.find(t => t.event === 'message.received')?.id || null,
        type: 'message.received',
        title: 'Nouveau message de Jean Dupont',
        content: 'Vous avez reçu un nouveau message de Jean Dupont.',
        data: JSON.stringify({
          sender: 'Jean Dupont',
          message: 'Bonjour, pouvez-vous me rappeler concernant le dossier #12345?',
          date: now.toISOString()
        }),
        channel: 'in_app',
        status: 'read',
        readAt: new Date(now.getTime() - 3600000), // 1 heure avant
        scheduledFor: null,
        priority: 'normal',
        actionUrl: '/messages/12345',
        actionText: 'Voir le message',
        errorDetails: null,
        createdAt: new Date(now.getTime() - 7200000), // 2 heures avant
        updatedAt: new Date(now.getTime() - 3600000) // 1 heure avant
      });
      
      // Notification non lue
      notifications.push({
        userId: users[0].id,
        templateId: templates.find(t => t.event === 'task.assigned')?.id || null,
        type: 'task.assigned',
        title: 'Nouvelle tâche assignée',
        content: 'La tâche "Préparer le rapport mensuel" vous a été assignée par Marie Martin.',
        data: JSON.stringify({
          taskName: 'Préparer le rapport mensuel',
          assignedBy: 'Marie Martin',
          dueDate: new Date(now.getTime() + 86400000 * 3).toISOString(), // Dans 3 jours
          description: 'Préparer le rapport mensuel des ventes pour la réunion de direction.',
          priority: 'high'
        }),
        channel: 'in_app',
        status: 'delivered',
        readAt: null,
        scheduledFor: null,
        priority: 'high',
        actionUrl: '/tasks/456',
        actionText: 'Voir la tâche',
        errorDetails: null,
        createdAt: new Date(now.getTime() - 1800000), // 30 minutes avant
        updatedAt: new Date(now.getTime() - 1800000) // 30 minutes avant
      });
    }
    
    // Notifications pour le deuxième utilisateur
    if (users[1]) {
      // Notification planifiée
      notifications.push({
        userId: users[1].id,
        templateId: templates.find(t => t.event === 'appointment.reminder')?.id || null,
        type: 'appointment.reminder',
        title: 'Rappel de rendez-vous',
        content: 'Rappel: Vous avez un rendez-vous "Réunion client" demain à 14:00.',
        data: JSON.stringify({
          title: 'Réunion client',
          date: new Date(now.getTime() + 86400000).toISOString().split('T')[0], // Demain
          time: '14:00',
          location: 'Salle de conférence A',
          notes: 'Apporter les documents du projet XYZ',
          participants: ['Jean Dupont', 'Marie Martin', 'Pierre Durand']
        }),
        channel: 'email',
        status: 'pending',
        readAt: null,
        scheduledFor: new Date(now.getTime() + 43200000), // Dans 12 heures
        priority: 'normal',
        actionUrl: '/calendar/789',
        actionText: 'Voir le rendez-vous',
        errorDetails: null,
        createdAt: now,
        updatedAt: now
      });
      
      // Notification échouée
      notifications.push({
        userId: users[1].id,
        templateId: templates.find(t => t.event === 'security.alert')?.id || null,
        type: 'security.alert',
        title: 'Alerte de sécurité',
        content: 'Alerte de sécurité: Tentative de connexion suspecte. Détails: Connexion depuis une nouvelle localisation.',
        data: JSON.stringify({
          alertType: 'Tentative de connexion suspecte',
          details: 'Connexion depuis une nouvelle localisation',
          timestamp: new Date(now.getTime() - 3600000).toISOString(), // 1 heure avant
          ipAddress: '203.0.113.42',
          location: 'Kiev, Ukraine',
          device: 'Windows 10, Chrome 98'
        }),
        channel: 'sms',
        status: 'failed',
        readAt: null,
        scheduledFor: null,
        priority: 'high',
        actionUrl: '/security/alerts',
        actionText: 'Vérifier',
        errorDetails: 'Impossible d\'envoyer le SMS: numéro de téléphone invalide',
        createdAt: new Date(now.getTime() - 3600000), // 1 heure avant
        updatedAt: new Date(now.getTime() - 3540000) // 59 minutes avant
      });
    }
    
    // Insérer les notifications
    if (notifications.length > 0) {
      await queryInterface.bulkInsert('Notifications', notifications, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {});
  }
};
