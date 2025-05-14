'use strict';

/**
 * Seeder pour les modèles de notification par défaut
 * Utilise une approche plus robuste pour éviter les erreurs de validation
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Vérifier si les tables existent
      const templateTableInfo = await queryInterface.sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='NotificationTemplates';",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      const channelTableInfo = await queryInterface.sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='NotificationChannels';",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      const templateChannelTableInfo = await queryInterface.sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='NotificationTemplateChannels';",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (templateTableInfo.length === 0 || channelTableInfo.length === 0 || templateChannelTableInfo.length === 0) {
        console.log("Une ou plusieurs tables nécessaires n'existent pas encore, le seeding sera ignoré.");
        return;
      }

      // Vérifier si des modèles de notification existent déjà
      const existingTemplates = await queryInterface.sequelize.query(
        "SELECT COUNT(*) as count FROM NotificationTemplates;",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (existingTemplates[0].count > 0) {
        console.log("Des modèles de notification existent déjà, le seeding sera ignoré.");
        return;
      }

      // Définir les modèles de notification par défaut
      const notificationTemplates = [
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
      ];

      // Insérer les modèles de notification un par un et stocker leurs IDs
      const templateIds = {};
      for (let i = 0; i < notificationTemplates.length; i++) {
        const template = notificationTemplates[i];
        try {
          const result = await queryInterface.sequelize.query(
            `INSERT INTO NotificationTemplates (name, event, subject, content, htmlContent, variables, active, category, language, createdAt, updatedAt) 
             VALUES (:name, :event, :subject, :content, :htmlContent, :variables, :active, :category, :language, :createdAt, :updatedAt)
             RETURNING id`,
            {
              replacements: template,
              type: queryInterface.sequelize.QueryTypes.INSERT
            }
          );
          
          // Stocker l'ID du modèle inséré
          const templateId = result[0][0].id || i + 1; // Fallback à l'index + 1 si l'ID n'est pas retourné
          templateIds[i + 1] = templateId;
          
          console.log(`Modèle de notification '${template.name}' inséré avec succès. ID: ${templateId}`);
        } catch (error) {
          console.error(`Erreur lors de l'insertion du modèle de notification '${template.name}':`, error.message);
        }
      }

      // Récupérer les IDs des canaux de notification
      const channels = await queryInterface.sequelize.query(
        'SELECT id, type FROM NotificationChannels',
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (channels.length === 0) {
        console.log("Aucun canal de notification trouvé, impossible de créer les associations.");
        return;
      }

      // Créer les associations entre modèles et canaux
      console.log("Création des associations entre modèles et canaux...");
      
      // Nouveau message - tous les canaux
      for (const channel of channels) {
        try {
          await queryInterface.sequelize.query(
            `INSERT INTO NotificationTemplateChannels (templateId, channelId, createdAt, updatedAt) 
             VALUES (:templateId, :channelId, :createdAt, :updatedAt)`,
            {
              replacements: {
                templateId: templateIds[1] || 1,
                channelId: channel.id,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              type: queryInterface.sequelize.QueryTypes.INSERT
            }
          );
          console.log(`Association créée: Template 'Nouveau message' -> Canal ${channel.type}`);
        } catch (error) {
          console.error(`Erreur lors de la création de l'association pour 'Nouveau message' et le canal ${channel.type}:`, error.message);
        }
      }
      
      // Tâche assignée - email, in_app
      for (const channel of channels.filter(c => ['email', 'in_app'].includes(c.type))) {
        try {
          await queryInterface.sequelize.query(
            `INSERT INTO NotificationTemplateChannels (templateId, channelId, createdAt, updatedAt) 
             VALUES (:templateId, :channelId, :createdAt, :updatedAt)`,
            {
              replacements: {
                templateId: templateIds[2] || 2,
                channelId: channel.id,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              type: queryInterface.sequelize.QueryTypes.INSERT
            }
          );
          console.log(`Association créée: Template 'Tâche assignée' -> Canal ${channel.type}`);
        } catch (error) {
          console.error(`Erreur lors de la création de l'association pour 'Tâche assignée' et le canal ${channel.type}:`, error.message);
        }
      }
      
      // Rappel de rendez-vous - email, sms, in_app
      for (const channel of channels.filter(c => ['email', 'sms', 'in_app'].includes(c.type))) {
        try {
          await queryInterface.sequelize.query(
            `INSERT INTO NotificationTemplateChannels (templateId, channelId, createdAt, updatedAt) 
             VALUES (:templateId, :channelId, :createdAt, :updatedAt)`,
            {
              replacements: {
                templateId: templateIds[3] || 3,
                channelId: channel.id,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              type: queryInterface.sequelize.QueryTypes.INSERT
            }
          );
          console.log(`Association créée: Template 'Rappel de rendez-vous' -> Canal ${channel.type}`);
        } catch (error) {
          console.error(`Erreur lors de la création de l'association pour 'Rappel de rendez-vous' et le canal ${channel.type}:`, error.message);
        }
      }
      
      // Alerte de sécurité - tous les canaux
      for (const channel of channels) {
        try {
          await queryInterface.sequelize.query(
            `INSERT INTO NotificationTemplateChannels (templateId, channelId, createdAt, updatedAt) 
             VALUES (:templateId, :channelId, :createdAt, :updatedAt)`,
            {
              replacements: {
                templateId: templateIds[4] || 4,
                channelId: channel.id,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              type: queryInterface.sequelize.QueryTypes.INSERT
            }
          );
          console.log(`Association créée: Template 'Alerte de sécurité' -> Canal ${channel.type}`);
        } catch (error) {
          console.error(`Erreur lors de la création de l'association pour 'Alerte de sécurité' et le canal ${channel.type}:`, error.message);
        }
      }
      
      // Mise à jour système - email, in_app
      for (const channel of channels.filter(c => ['email', 'in_app'].includes(c.type))) {
        try {
          await queryInterface.sequelize.query(
            `INSERT INTO NotificationTemplateChannels (templateId, channelId, createdAt, updatedAt) 
             VALUES (:templateId, :channelId, :createdAt, :updatedAt)`,
            {
              replacements: {
                templateId: templateIds[5] || 5,
                channelId: channel.id,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              type: queryInterface.sequelize.QueryTypes.INSERT
            }
          );
          console.log(`Association créée: Template 'Mise à jour système' -> Canal ${channel.type}`);
        } catch (error) {
          console.error(`Erreur lors de la création de l'association pour 'Mise à jour système' et le canal ${channel.type}:`, error.message);
        }
      }
      
      console.log("Seeding des modèles de notification terminé avec succès.");
    } catch (error) {
      console.error("Erreur lors du seeding des modèles de notification:", error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Supprimer d'abord les associations
      await queryInterface.bulkDelete('NotificationTemplateChannels', null, {});
      // Puis supprimer les modèles
      await queryInterface.bulkDelete('NotificationTemplates', null, {});
    } catch (error) {
      console.error("Erreur lors de la suppression des modèles de notification:", error.message);
    }
  }
};
