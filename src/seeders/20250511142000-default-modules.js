'use strict';

/**
 * Seeder pour les modules par défaut
 * Utilise une approche plus robuste pour éviter les erreurs de validation
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      // Vérifier si la table existe
      const tableInfo = await queryInterface.sequelize.query(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Modules';",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (tableInfo.length === 0) {
        console.log("La table Modules n'existe pas encore, le seeding sera ignoré.");
        return;
      }

      // Vérifier si des modules existent déjà
      const existingModules = await queryInterface.sequelize.query(
        "SELECT COUNT(*) as count FROM Modules;",
        { type: queryInterface.sequelize.QueryTypes.SELECT }
      );

      if (existingModules[0].count > 0) {
        console.log("Des modules existent déjà, le seeding sera ignoré.");
        return;
      }

      // Définir les modules par défaut
      const defaultModules = [
        {
          name: 'test',
          displayName: 'Module de Test',
          version: '1.0.0',
          summary: 'Module de test',
          description: 'Module de test pour la gestion des employés, départements, congés et feuilles de temps',
          active: true,
          installed: false,
          installable: true,
          application: true,
          autoInstall: false,}
      ];

      // Insérer les modules un par un pour éviter les problèmes
      for (const module of defaultModules) {
        try {
          await queryInterface.sequelize.query(
            `INSERT INTO Modules (name, displayName, version, summary, description, active, installed, installable, application, autoInstall, dependencies, models, installedAt, createdAt, updatedAt) 
             VALUES (:name, :displayName, :version, :summary, :description, :active, :installed, :installable, :application, :autoInstall, :dependencies, :models, :installedAt, :createdAt, :updatedAt)`,
            {
              replacements: {
                name: module.name,
                displayName: module.displayName,
                version: module.version,
                summary: module.summary,
                description: module.description,
                active: module.active,
                installed: module.installed,
                installable: module.installable,
                application: module.application,
                autoInstall: module.autoInstall,
                dependencies: module.dependencies,
                models: module.models,
                installedAt: module.installedAt,
                createdAt: module.createdAt,
                updatedAt: module.updatedAt
              },
              type: queryInterface.sequelize.QueryTypes.INSERT
            }
          );
          console.log(`Module '${module.name}' inséré avec succès.`);
        } catch (error) {
          console.error(`Erreur lors de l'insertion du module '${module.name}':`, error.message);
        }
      }

      console.log("Seeding des modules terminé avec succès.");
    } catch (error) {
      console.error("Erreur lors du seeding des modules:", error.message);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      // Supprimer tous les modules par défaut
      await queryInterface.bulkDelete('Modules', {
        name: {
          [Sequelize.Op.in]: ['hr', 'crm', 'finance', 'inventory', 'project']
        }
      }, {});
    } catch (error) {
      console.error("Erreur lors de la suppression des modules:", error.message);
    }
  }
};
