'use strict';

/**
 * Seeder pour les paramètres de journalisation par défaut
 * Utilise une approche plus robuste pour éviter les erreurs de validation
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Vérifier si la table existe
      const tableInfo = await queryInterface.sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='LoggingSettings';",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (tableInfo.length === 0) {
        console.log("La table LoggingSettings n'existe pas encore, le seeding sera ignoré.");
        return;
      }

      // Vérifier si des paramètres de journalisation existent déjà
      const existingSettings = await queryInterface.sequelize.query(
        "SELECT COUNT(*) as count FROM LoggingSettings;",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (existingSettings[0].count > 0) {
        console.log("Des paramètres de journalisation existent déjà, le seeding sera ignoré.");
        return;
      }

      // Définir les paramètres de journalisation par défaut
      const loggingSettings = [
        {
          key: 'level',
          value: 'info',
          description: 'Niveau de détail des logs (error, warn, info, debug, trace)',
          valueType: 'string',
          category: 'logging',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'retentionDays',
          value: '30',
          description: 'Nombre de jours de conservation des logs avant suppression',
          valueType: 'number',
          category: 'logging',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'maxSize',
          value: '100',
          description: 'Taille maximale des fichiers de log en MB avant rotation',
          valueType: 'number',
          category: 'logging',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'compress',
          value: 'true',
          description: 'Compression des fichiers de log archivés',
          valueType: 'boolean',
          category: 'logging',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'consoleOutput',
          value: 'false',
          description: 'Affichage des logs dans la console en plus des fichiers',
          valueType: 'boolean',
          category: 'logging',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'logDirectory',
          value: './logs',
          description: 'Répertoire de stockage des fichiers de log',
          valueType: 'string',
          category: 'logging',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'filePattern',
          value: 'app-%DATE%.log',
          description: 'Format de nommage des fichiers de log',
          valueType: 'string',
          category: 'logging',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'datePattern',
          value: 'YYYY-MM-DD',
          description: 'Format de date pour la rotation des logs',
          valueType: 'string',
          category: 'logging',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'maxFiles',
          value: '14',
          description: 'Nombre maximum de fichiers de log à conserver',
          valueType: 'number',
          category: 'logging',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      // Insérer les paramètres de journalisation un par un pour éviter les problèmes
      for (const setting of loggingSettings) {
        try {
          await queryInterface.sequelize.query(
            `INSERT INTO LoggingSettings (key, value, description, valueType, category, createdAt, updatedAt) 
             VALUES (:key, :value, :description, :valueType, :category, :createdAt, :updatedAt)`,
            {
              replacements: setting,
              type: queryInterface.sequelize.QueryTypes.INSERT
            }
          );
          console.log(`Paramètre de journalisation '${setting.key}' inséré avec succès.`);
        } catch (error) {
          console.error(`Erreur lors de l'insertion du paramètre de journalisation '${setting.key}':`, error.message);
        }
      }
    } catch (error) {
      console.error("Erreur lors du seeding des paramètres de journalisation:", error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Supprimer tous les paramètres de journalisation
      await queryInterface.bulkDelete('LoggingSettings', null, {});
    } catch (error) {
      console.error("Erreur lors de la suppression des paramètres de journalisation:", error.message);
    }
  }
};
