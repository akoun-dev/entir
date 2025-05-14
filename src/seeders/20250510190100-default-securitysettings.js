'use strict';

/**
 * Seeder pour les paramètres de sécurité par défaut
 * Utilise une approche plus robuste pour éviter les erreurs de validation
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Vérifier si la table existe
      const tableInfo = await queryInterface.sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='SecuritySettings';",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (tableInfo.length === 0) {
        console.log("La table SecuritySettings n'existe pas encore, le seeding sera ignoré.");
        return;
      }

      // Vérifier si des paramètres de sécurité existent déjà
      const existingSettings = await queryInterface.sequelize.query(
        "SELECT COUNT(*) as count FROM SecuritySettings;",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (existingSettings[0].count > 0) {
        console.log("Des paramètres de sécurité existent déjà, le seeding sera ignoré.");
        return;
      }

      // Définir les paramètres de sécurité par défaut
      const securitySettings = [
        {
          key: 'password_complexity',
          value: 'true',
          description: 'Exiger des mots de passe complexes (majuscules, minuscules, chiffres, caractères spéciaux)',
          valueType: 'boolean',
          category: 'password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'password_min_length',
          value: '8',
          description: 'Longueur minimale des mots de passe',
          valueType: 'number',
          category: 'password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'password_expiration_days',
          value: '90',
          description: 'Nombre de jours avant expiration du mot de passe (0 = jamais)',
          valueType: 'number',
          category: 'password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'password_history_count',
          value: '5',
          description: 'Nombre de mots de passe précédents à mémoriser pour éviter la réutilisation',
          valueType: 'number',
          category: 'password',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'two_factor_auth',
          value: 'false',
          description: 'Activer l\'authentification à deux facteurs',
          valueType: 'boolean',
          category: 'authentication',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'failed_login_attempts',
          value: '5',
          description: 'Nombre de tentatives de connexion échouées avant blocage',
          valueType: 'number',
          category: 'authentication',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'account_lockout_duration',
          value: '30',
          description: 'Durée de blocage du compte après échec de connexion (minutes)',
          valueType: 'number',
          category: 'authentication',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'session_timeout',
          value: '60',
          description: 'Délai d\'inactivité avant déconnexion automatique (minutes)',
          valueType: 'number',
          category: 'session',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'session_max_duration',
          value: '480',
          description: 'Durée maximale d\'une session (minutes)',
          valueType: 'number',
          category: 'session',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'ip_restriction_enabled',
          value: 'false',
          description: 'Activer la restriction par adresse IP',
          valueType: 'boolean',
          category: 'access',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'allowed_ips',
          value: '[]',
          description: 'Liste des adresses IP autorisées (format JSON)',
          valueType: 'json',
          category: 'access',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'force_ssl',
          value: 'true',
          description: 'Forcer l\'utilisation de SSL/HTTPS',
          valueType: 'boolean',
          category: 'access',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      // Insérer les paramètres de sécurité un par un pour éviter les problèmes
      for (const setting of securitySettings) {
        try {
          await queryInterface.sequelize.query(
            `INSERT INTO SecuritySettings (key, value, description, valueType, category, createdAt, updatedAt) 
             VALUES (:key, :value, :description, :valueType, :category, :createdAt, :updatedAt)`,
            {
              replacements: setting,
              type: queryInterface.sequelize.QueryTypes.INSERT
            }
          );
          console.log(`Paramètre de sécurité '${setting.key}' inséré avec succès.`);
        } catch (error) {
          console.error(`Erreur lors de l'insertion du paramètre de sécurité '${setting.key}':`, error.message);
        }
      }
    } catch (error) {
      console.error("Erreur lors du seeding des paramètres de sécurité:", error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Supprimer tous les paramètres de sécurité
      await queryInterface.bulkDelete('SecuritySettings', null, {});
    } catch (error) {
      console.error("Erreur lors de la suppression des paramètres de sécurité:", error.message);
    }
  }
};
