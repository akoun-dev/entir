'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insérer les modèles de notification
    const templates = await queryInterface.bulkInsert('NotificationTemplates', [
      {
        name: 'Nouveau message',
        event: 'message.received',
        subject: 'Vous avez reçu un nouveau message',
        content: 'Vous avez reçu un nouveau message de {{sender}}.',
        htmlContent: '<p>Vous avez reçu un nouveau message de <strong>{{sender}}</strong>.</p><p>Message: {{message}}</p>',
        variables: JSON.stringify(['sender', 'message', 'date']),
        active: true,
        category: 'communication',
        language: 'fr-FR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tâche assignée',
        event: 'task.assigned',
        subject: 'Une nouvelle tâche vous a été assignée',
        content: 'La tâche "{{taskName}}" vous a été assignée par {{assignedBy}}. Date d\'échéance: {{dueDate}}.',
        htmlContent: '<p>La tâche <strong>"{{taskName}}"</strong> vous a été assignée par {{assignedBy}}.</p><p>Date d\'échéance: {{dueDate}}</p><p>Description: {{description}}</p>',
        variables: JSON.stringify(['taskName', 'assignedBy', 'dueDate', 'description', 'priority']),
        active: true,
        category: 'task',
        language: 'fr-FR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Rappel de rendez-vous',
        event: 'appointment.reminder',
        subject: 'Rappel de votre rendez-vous',
        content: 'Rappel: Vous avez un rendez-vous "{{title}}" le {{date}} à {{time}}.',
        htmlContent: '<p>Rappel: Vous avez un rendez-vous <strong>"{{title}}"</strong> le {{date}} à {{time}}.</p><p>Lieu: {{location}}</p><p>Notes: {{notes}}</p>',
        variables: JSON.stringify(['title', 'date', 'time', 'location', 'notes', 'participants']),
        active: true,
        category: 'calendar',
        language: 'fr-FR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alerte de sécurité',
        event: 'security.alert',
        subject: 'Alerte de sécurité importante',
        content: 'Alerte de sécurité: {{alertType}}. Détails: {{details}}',
        htmlContent: '<p><strong>Alerte de sécurité: {{alertType}}</strong></p><p>Détails: {{details}}</p><p>Date et heure: {{timestamp}}</p><p>IP: {{ipAddress}}</p>',
        variables: JSON.stringify(['alertType', 'details', 'timestamp', 'ipAddress', 'location', 'device']),
        active: true,
        category: 'security',
        language: 'fr-FR',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mise à jour système',
        event: 'system.update',
        subject: 'Mise à jour système prévue',
        content: 'Une mise à jour système est prévue le {{date}} à {{time}}. Durée estimée: {{duration}}.',
        htmlContent: '<p>Une mise à jour système est prévue le <strong>{{date}}</strong> à <strong>{{time}}</strong>.</p><p>Durée estimée: {{duration}}</p><p>Impact: {{impact}}</p><p>Notes: {{notes}}</p>',
        variables: JSON.stringify(['date', 'time', 'duration', 'impact', 'notes', 'version']),
        active: true,
        category: 'system',
        language: 'fr-FR',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Récupérer les IDs des canaux de notification
    const channels = await queryInterface.sequelize.query(
      'SELECT id, type FROM "NotificationChannels"',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Créer les associations entre modèles et canaux
    const templateChannelAssociations = [];
    
    // Nouveau message - tous les canaux
    channels.forEach(channel => {
      templateChannelAssociations.push({
        templateId: 1, // Nouveau message
        channelId: channel.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    
    // Tâche assignée - email, in_app
    channels.filter(c => ['email', 'in_app'].includes(c.type)).forEach(channel => {
      templateChannelAssociations.push({
        templateId: 2, // Tâche assignée
        channelId: channel.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    
    // Rappel de rendez-vous - email, sms, in_app
    channels.filter(c => ['email', 'sms', 'in_app'].includes(c.type)).forEach(channel => {
      templateChannelAssociations.push({
        templateId: 3, // Rappel de rendez-vous
        channelId: channel.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    
    // Alerte de sécurité - email, sms, in_app, webhook
    channels.forEach(channel => {
      templateChannelAssociations.push({
        templateId: 4, // Alerte de sécurité
        channelId: channel.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });
    
    // Mise à jour système - email, in_app
    channels.filter(c => ['email', 'in_app'].includes(c.type)).forEach(channel => {
      templateChannelAssociations.push({
        templateId: 5, // Mise à jour système
        channelId: channel.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    // Insérer les associations
    await queryInterface.bulkInsert('NotificationTemplateChannels', templateChannelAssociations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('NotificationTemplateChannels', null, {});
    await queryInterface.bulkDelete('NotificationTemplates', null, {});
  }
};
