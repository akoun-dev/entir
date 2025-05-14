'use strict';

/**
 * Modèle Contract (Contrat)
 *
 * Représente un contrat de travail pour un employé
 */
module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    // Identifiant unique
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    // Informations du contrat
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Nom/référence du contrat',
    },
    reference: {
      type: DataTypes.STRING,
      unique: true,
      comment: 'Numéro de référence unique du contrat'
    },

    // Dates du contrat
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: 'Date de début du contrat'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      comment: 'Date de fin du contrat (null pour CDI)'
    },

    // Type et statut du contrat
    type: {
      type: DataTypes.ENUM('cdi', 'cdd', 'interim', 'apprenticeship', 'internship', 'other'),
      allowNull: false,
      comment: 'Type de contrat'
    },
    status: {
      type: DataTypes.ENUM('draft', 'pending', 'active', 'expired', 'terminated'),
      defaultValue: 'draft',
      comment: 'Statut du contrat'
    },

    // Informations salariales
    wage: {
      type: DataTypes.DECIMAL(15, 2),
      comment: 'Salaire de base'
    },
    wageType: {
      type: DataTypes.ENUM('hourly', 'monthly', 'annual'),
      defaultValue: 'monthly',
      comment: 'Type de salaire (horaire, mensuel, annuel)'
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'EUR',
      comment: 'Devise du salaire'
    },

    // Temps de travail
    workingHours: {
      type: DataTypes.DECIMAL(5, 2),
      comment: 'Nombre d\'heures de travail par semaine'
    },
    workingTimeType: {
      type: DataTypes.ENUM('full_time', 'part_time'),
      defaultValue: 'full_time',
      comment: 'Type de temps de travail'
    },

    // Période d'essai
    trialPeriod: {
      type: DataTypes.INTEGER,
      comment: 'Durée de la période d\'essai en jours'
    },
    trialEndDate: {
      type: DataTypes.DATEONLY,
      comment: 'Date de fin de la période d\'essai'
    },

    // Notes et commentaires
    notes: {
      type: DataTypes.TEXT,
      comment: 'Notes sur le contrat'
    },

    // Champs système
    createdBy: {
      type: DataTypes.INTEGER,
      comment: 'ID de l\'utilisateur qui a créé l\'enregistrement'
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      comment: 'ID de l\'utilisateur qui a mis à jour l\'enregistrement'
    }
  }, {
    tableName: 'hr_contracts',
    timestamps: true,
    comment: 'Table des contrats de travail',
    indexes: [
      {
        name: 'contract_reference_idx',
        unique: true,
        fields: ['reference']
      },
      {
        name: 'contract_employee_idx',
        fields: ['employeeId']
      },
      {
        name: 'contract_dates_idx',
        fields: ['startDate', 'endDate']
      },
      {
        name: 'contract_status_idx',
        fields: ['status']
      }
    ]
  });

  // Associations
  Contract.associate = function(models) {
    // Un contrat appartient à un employé
    Contract.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
      as: 'employee'
    });
  };

  return Contract;
};
