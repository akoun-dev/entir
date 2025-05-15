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
    date_start: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.startDate;
      },
      set(value) {
        this.setDataValue('startDate', value);
      },
      comment: 'Alias pour startDate (virtuel)'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      comment: 'Date de fin du contrat (null pour CDI)'
    },
    date_end: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.endDate;
      },
      set(value) {
        this.setDataValue('endDate', value);
      },
      comment: 'Alias pour endDate (virtuel)'
    },

    // Type et statut du contrat
    type: {
      type: DataTypes.ENUM('cdi', 'cdd', 'interim', 'apprenticeship', 'internship', 'other'),
      allowNull: false,
      comment: 'Type de contrat'
    },
    contract_type: {
      type: DataTypes.VIRTUAL,
      get() {
        // Convertir le type en format plus lisible (CDI, CDD, etc.)
        const typeMap = {
          'cdi': 'CDI',
          'cdd': 'CDD',
          'interim': 'Intérim',
          'apprenticeship': 'Apprentissage',
          'internship': 'Stage',
          'other': 'Autre'
        };
        return typeMap[this.type] || this.type;
      },
      comment: 'Type de contrat formaté pour l\'affichage (virtuel)'
    },
    status: {
      type: DataTypes.ENUM('draft', 'pending', 'running', 'expired', 'terminated'),
      defaultValue: 'draft',
      comment: 'Statut du contrat'
    },
    state: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.status;
      },
      set(value) {
        this.setDataValue('status', value);
      },
      comment: 'Alias pour status (virtuel)'
    },
    employee_name: {
      type: DataTypes.VIRTUAL,
      comment: 'Nom de l\'employé (virtuel, calculé à partir de l\'association)'
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
    wage_type: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.wageType;
      },
      set(value) {
        this.setDataValue('wageType', value);
      },
      comment: 'Alias pour wageType (virtuel)'
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
    working_hours: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.workingHours;
      },
      set(value) {
        this.setDataValue('workingHours', value);
      },
      comment: 'Alias pour workingHours (virtuel)'
    },
    workingTimeType: {
      type: DataTypes.ENUM('full_time', 'part_time'),
      defaultValue: 'full_time',
      comment: 'Type de temps de travail'
    },
    working_time_type: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.workingTimeType;
      },
      set(value) {
        this.setDataValue('workingTimeType', value);
      },
      comment: 'Alias pour workingTimeType (virtuel)'
    },

    // Période d'essai
    trialPeriod: {
      type: DataTypes.INTEGER,
      comment: 'Durée de la période d\'essai en jours'
    },
    trial_period: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.trialPeriod;
      },
      set(value) {
        this.setDataValue('trialPeriod', value);
      },
      comment: 'Alias pour trialPeriod (virtuel)'
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

    // Ajouter un getter pour le nom de l'employé
    Contract.prototype.getEmployeeName = async function() {
      if (this.employee) {
        return this.employee.name;
      }

      if (this.employeeId) {
        const employee = await models.Employee.findByPk(this.employeeId);
        return employee ? employee.name : null;
      }

      return null;
    };

    // Définir une propriété virtuelle pour employee_id
    Object.defineProperty(Contract.prototype, 'employee_id', {
      get: function() {
        return this.employeeId;
      },
      set: function(value) {
        this.employeeId = value;
      }
    });

    // Définir des propriétés virtuelles pour created_at et updated_at
    Object.defineProperty(Contract.prototype, 'created_at', {
      get: function() {
        return this.createdAt;
      }
    });

    Object.defineProperty(Contract.prototype, 'updated_at', {
      get: function() {
        return this.updatedAt;
      }
    });
  };

  return Contract;
};
