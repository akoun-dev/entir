'use strict';

/**
 * Seeder pour les traductions par défaut
 * Utilise une approche plus robuste pour éviter les erreurs de validation
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Vérifier si la table existe
      const tableInfo = await queryInterface.sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Translations';",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (tableInfo.length === 0) {
        console.log("La table Translations n'existe pas encore, le seeding sera ignoré.");
        return;
      }

      // Vérifier si des traductions existent déjà
      const existingTranslations = await queryInterface.sequelize.query(
        "SELECT COUNT(*) as count FROM Translations;",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (existingTranslations[0].count > 0) {
        console.log("Des traductions existent déjà, le seeding sera ignoré.");
        return;
      }

      // Créer les traductions par défaut
      const defaultTranslations = [
        {
          key: 'welcome',
          locale: 'fr',
          namespace: 'common',
          value: 'Bienvenue',
          is_default: true,
          active: true,
          description: 'Message de bienvenue principal',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'login',
          locale: 'fr',
          namespace: 'auth',
          value: 'Connexion',
          is_default: true,
          active: true,
          description: 'Texte du bouton de connexion',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          key: 'logout',
          locale: 'fr',
          namespace: 'auth',
          value: 'Déconnexion',
          is_default: true,
          active: true,
          description: 'Texte du bouton de déconnexion',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      // Insérer les traductions une par une pour éviter les problèmes
      for (const translation of defaultTranslations) {
        try {
          await queryInterface.sequelize.query(
            `INSERT INTO Translations (key, locale, namespace, value, is_default, active, description, createdAt, updatedAt)
             VALUES (:key, :locale, :namespace, :value, :is_default, :active, :description, :createdAt, :updatedAt)`,
            {
              replacements: translation,
              type: queryInterface.sequelize.QueryTypes.INSERT
            }
          );
          console.log(`Traduction '${translation.key}' insérée avec succès.`);
        } catch (error) {
          console.error(`Erreur lors de l'insertion de la traduction '${translation.key}':`, error.message);
        }
      }
    } catch (error) {
      console.error("Erreur lors du seeding des traductions:", error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkDelete('Translations', {
        key: {
          [Sequelize.Op.in]: ['welcome', 'login', 'logout']
        },
        locale: 'fr'
      }, {});
    } catch (error) {
      console.error("Erreur lors de la suppression des traductions:", error.message);
    }
  }
};
