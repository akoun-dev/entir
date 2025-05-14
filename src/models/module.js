'use strict';
const { Model } = require('sequelize');

/**
 * Modèle pour les modules de l'application
 * Stocke les informations sur les modules installés et leur état
 */
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Méthode d'aide pour définir les associations.
     * Cette méthode n'est pas une partie du cycle de vie de Sequelize.
     * Le modèle `models/index` l'appellera automatiquement.
     */
    static associate(models) {
      // définir les associations ici
    }
  }

  Module.init({
    // Nom technique du module (doit correspondre au nom du dossier dans addons/)
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    // Nom d'affichage du module
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Version du module
    version: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Description courte du module
    summary: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Description complète du module
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    // État d'activation du module (actif/inactif)
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Indique si le module est installé
    installed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Indique si le module est installable
    installable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    // Indique si le module est une application (avec interface utilisateur)
    application: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    // Indique si le module doit être installé automatiquement
    autoInstall: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // Liste des dépendances du module (stockée en JSON)
    dependencies: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('dependencies');
        if (!rawValue) return [];
        try {
          return JSON.parse(rawValue);
        } catch (error) {
          console.error(`Erreur lors du parsing des dépendances pour le module ${this.name}:`, error);
          return [];
        }
      },
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue('dependencies', JSON.stringify(value));
        } else if (typeof value === 'string') {
          // Si c'est déjà une chaîne, essayer de la parser pour vérifier que c'est du JSON valide
          try {
            JSON.parse(value);
            this.setDataValue('dependencies', value);
          } catch (error) {
            // Si ce n'est pas du JSON valide, le considérer comme une seule dépendance
            this.setDataValue('dependencies', JSON.stringify([value]));
          }
        } else {
          this.setDataValue('dependencies', '[]');
        }
      }
    },
    // Liste des modèles définis par le module (stockée en JSON)
    models: {
      type: DataTypes.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('models');
        if (!rawValue) return [];
        try {
          return JSON.parse(rawValue);
        } catch (error) {
          console.error(`Erreur lors du parsing des modèles pour le module ${this.name}:`, error);
          return [];
        }
      },
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue('models', JSON.stringify(value));
        } else if (typeof value === 'string') {
          // Si c'est déjà une chaîne, essayer de la parser pour vérifier que c'est du JSON valide
          try {
            JSON.parse(value);
            this.setDataValue('models', value);
          } catch (error) {
            // Si ce n'est pas du JSON valide, le considérer comme un seul modèle
            this.setDataValue('models', JSON.stringify([value]));
          }
        } else {
          this.setDataValue('models', '[]');
        }
      }
    },
    // Date d'installation du module
    installedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // Date de dernière mise à jour du module
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    // Date de création de l'enregistrement
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Module',
  });

  return Module;
};
