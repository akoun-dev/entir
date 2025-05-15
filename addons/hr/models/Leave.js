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
    date_from: {
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
      allowNull: false,
      comment: 'Date de fin du congé'
    },
    date_to: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.endDate;
      },
      set(value) {
        this.setDataValue('endDate', value);
      },
      comment: 'Alias pour endDate (virtuel)'
    },

    // Durée du congé
    duration: {
      type: DataTypes.DECIMAL(5, 2),
      comment: 'Durée du congé en jours'
    },
    number_of_days: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.duration;
      },
      set(value) {
        this.setDataValue('duration', value);
      },
      comment: 'Alias pour duration (virtuel)'
    },

    // Statut de la demande
    status: {
      type: DataTypes.ENUM('draft', 'submitted', 'approved', 'rejected', 'cancelled'),
      defaultValue: 'draft',
      comment: 'Statut de la demande de congé'
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

    // Champs pour l'interface
    employee_name: {
      type: DataTypes.VIRTUAL,
      comment: 'Nom de l\'employé (virtuel, calculé à partir de l\'association)'
    },
    type: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.leaveTypeId;
      },
      set(value) {
        this.setDataValue('leaveTypeId', value);
      },
      comment: 'Alias pour leaveTypeId (virtuel)'
    },
    type_name: {
      type: DataTypes.VIRTUAL,
      comment: 'Nom du type de congé (virtuel, calculé à partir de l\'association)'
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

    // Ajouter un getter pour le nom de l'employé
    Leave.prototype.getEmployeeName = async function() {
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
    Object.defineProperty(Leave.prototype, 'employee_id', {
      get: function() {
        return this.employeeId;
      },
      set: function(value) {
        this.employeeId = value;
      }
    });

    // Un congé a un type de congé
    Leave.belongsTo(models.LeaveType, {
      foreignKey: 'leaveTypeId',
      as: 'leaveType'
    });

    // Ajouter un getter pour le nom du type de congé
    Leave.prototype.getTypeName = async function() {
      if (this.leaveType) {
        return this.leaveType.name;
      }

      if (this.leaveTypeId) {
        const leaveType = await models.LeaveType.findByPk(this.leaveTypeId);
        return leaveType ? leaveType.name : null;
      }

      return null;
    };

    // Un congé peut avoir un approbateur
    Leave.belongsTo(models.Employee, {
      foreignKey: 'approvedBy',
      as: 'approver'
    });

    // Définir des propriétés virtuelles pour created_at et updated_at
    Object.defineProperty(Leave.prototype, 'created_at', {
      get: function() {
        return this.createdAt;
      }
    });

    Object.defineProperty(Leave.prototype, 'updated_at', {
      get: function() {
        return this.updatedAt;
      }
    });

    // Définir une propriété virtuelle pour description
    Object.defineProperty(Leave.prototype, 'description', {
      get: function() {
        return this.reason;
      },
      set: function(value) {
        this.reason = value;
      }
    });

    // Note: L'association avec EmployeeDocument est commentée car ce modèle n'existe pas encore
    // Leave.hasMany(models.EmployeeDocument, {
    //   foreignKey: 'leaveId',
    //   as: 'documents'
    // });
  };

  return Leave;
};
