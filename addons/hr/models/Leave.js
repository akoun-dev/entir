'use strict';

/**
 * Modèle Leave (Congé)
 *
 * Représente une demande ou un enregistrement de congé pour un employé
 */
module.exports = (sequelize, DataTypes) => {
  const Leave = sequelize.define('Leave', {
    // Identifiant unique
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    // Dates du congé
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: 'Date de début du congé'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      comment: 'Date de fin du congé'
    },

    // Durée du congé
    duration: {
      type: DataTypes.DECIMAL(5, 2),
      comment: 'Durée du congé en jours'
    },

    // Statut de la demande
    status: {
      type: DataTypes.ENUM('draft', 'submitted', 'approved', 'rejected', 'cancelled'),
      defaultValue: 'draft',
      comment: 'Statut de la demande de congé'
    },

    // Raison et description
    reason: {
      type: DataTypes.TEXT,
      comment: 'Raison du congé'
    },

    // Approbation
    approvedBy: {
      type: DataTypes.INTEGER,
      comment: 'ID de l\'employé qui a approuvé la demande'
    },
    approvedAt: {
      type: DataTypes.DATE,
      comment: 'Date et heure d\'approbation'
    },

    // Commentaires
    comments: {
      type: DataTypes.TEXT,
      comment: 'Commentaires sur la demande de congé'
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
    tableName: 'hr_leaves',
    timestamps: true,
    comment: 'Table des congés',
    indexes: [
      {
        name: 'leave_employee_idx',
        fields: ['employeeId']
      },
      {
        name: 'leave_dates_idx',
        fields: ['startDate', 'endDate']
      },
      {
        name: 'leave_status_idx',
        fields: ['status']
      },
      {
        name: 'leave_type_idx',
        fields: ['leaveTypeId']
      }
    ]
  });

  // Associations
  Leave.associate = function(models) {
    // Un congé appartient à un employé
    Leave.belongsTo(models.Employee, {
      foreignKey: 'employeeId',
      as: 'employee'
    });

    // Un congé a un type de congé
    Leave.belongsTo(models.LeaveType, {
      foreignKey: 'leaveTypeId',
      as: 'leaveType'
    });

    // Un congé peut avoir un approbateur
    Leave.belongsTo(models.Employee, {
      foreignKey: 'approvedBy',
      as: 'approver'
    });

    // Note: L'association avec EmployeeDocument est commentée car ce modèle n'existe pas encore
    // Leave.hasMany(models.EmployeeDocument, {
    //   foreignKey: 'leaveId',
    //   as: 'documents'
    // });
  };

  return Leave;
};
