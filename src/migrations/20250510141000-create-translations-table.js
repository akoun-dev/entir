'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vérifier si la table existe déjà
    const tableInfo = await queryInterface.sequelize.query(
      "SELECT * FROM sqlite_master WHERE type='table' AND name='Translations';",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (tableInfo.length > 0) {
      // La table existe déjà, nous allons la modifier

      // Vérifier si la colonne locale existe
      try {
        await queryInterface.sequelize.query(
          "SELECT locale FROM Translations LIMIT 1;",
          { type: queryInterface.sequelize.QueryTypes.SELECT }
        );
      } catch (error) {
        // La colonne locale n'existe pas, nous allons l'ajouter
        await queryInterface.addColumn('Translations', 'locale', {
          type: Sequelize.STRING(5),
          allowNull: true,
        });

        // Copier les données de language_code vers locale
        await queryInterface.sequelize.query(
          "UPDATE Translations SET locale = language_code;",
          { type: queryInterface.sequelize.QueryTypes.UPDATE }
        );

        // Rendre la colonne locale non nullable
        await queryInterface.changeColumn('Translations', 'locale', {
          type: Sequelize.STRING(5),
          allowNull: false,
        });
      }

      // Vérifier si la colonne is_default existe
      try {
        await queryInterface.sequelize.query(
          "SELECT is_default FROM Translations LIMIT 1;",
          { type: queryInterface.sequelize.QueryTypes.SELECT }
        );
      } catch (error) {
        // La colonne is_default n'existe pas, nous allons l'ajouter
        await queryInterface.addColumn('Translations', 'is_default', {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        });
      }

      // Vérifier si la colonne description existe
      try {
        await queryInterface.sequelize.query(
          "SELECT description FROM Translations LIMIT 1;",
          { type: queryInterface.sequelize.QueryTypes.SELECT }
        );
      } catch (error) {
        // La colonne description n'existe pas, nous allons l'ajouter
        await queryInterface.addColumn('Translations', 'description', {
          type: Sequelize.TEXT,
          allowNull: true,
        });
      }

      // Vérifier si l'index unique existe
      try {
        await queryInterface.sequelize.query(
          "SELECT * FROM sqlite_master WHERE type='index' AND name='translations_unique_key_locale_namespace';",
          { type: queryInterface.sequelize.QueryTypes.SELECT }
        );
      } catch (error) {
        // L'index n'existe pas, nous allons l'ajouter
        await queryInterface.addIndex('Translations', ['key', 'locale', 'namespace'], {
          unique: true,
          name: 'translations_unique_key_locale_namespace'
        });
      }
    } else {
      // La table n'existe pas, nous allons la créer
      await queryInterface.createTable('Translations', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        key: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        locale: {
          type: Sequelize.STRING(5),
          allowNull: false,
        },
        namespace: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'common',
        },
        value: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        is_default: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        active: {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });

      // Ajouter un index unique sur key, locale et namespace
      await queryInterface.addIndex('Translations', ['key', 'locale', 'namespace'], {
        unique: true,
        name: 'translations_unique_key_locale_namespace'
      });
    }
  },
  async down(queryInterface, Sequelize) {
    // Ne pas supprimer la table, juste les colonnes ajoutées
    try {
      await queryInterface.removeColumn('Translations', 'locale');
      await queryInterface.removeColumn('Translations', 'is_default');
      await queryInterface.removeColumn('Translations', 'description');
      await queryInterface.removeIndex('Translations', 'translations_unique_key_locale_namespace');
    } catch (error) {
      console.error('Erreur lors de la suppression des colonnes:', error);
    }
  }
};
