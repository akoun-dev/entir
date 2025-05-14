'use strict';

/**
 * Modèle Employee (Employé)
 *
 * Représente un employé dans le système
 */
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    // Identifiant unique
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    // Informations personnelles
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Prénom de l\'employé'
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Nom de famille de l\'employé'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
      comment: 'Adresse email professionnelle'
    },
    phone: {
      type: DataTypes.STRING,
      comment: 'Numéro de téléphone'
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      comment: 'Date de naissance'
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      comment: 'Genre'
    },

    // Informations professionnelles
    employeeNumber: {
      type: DataTypes.STRING,
      unique: true,
      comment: 'Numéro d\'employé unique'
    },
    hireDate: {
      type: DataTypes.DATEONLY,
      comment: 'Date d\'embauche'
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: 'Date de fin de contrat (si applicable)'
    },

    // Coordonnées
    address: {
      type: DataTypes.TEXT,
      comment: 'Adresse postale'
    },
    city: {
      type: DataTypes.STRING,
      comment: 'Ville'
    },
    state: {
      type: DataTypes.STRING,
      comment: 'État/Province/Région'
    },
    postalCode: {
      type: DataTypes.STRING,
      comment: 'Code postal'
    },
    country: {
      type: DataTypes.STRING,
      comment: 'Pays'
    },

    // Informations bancaires
    bankName: {
      type: DataTypes.STRING,
      comment: 'Nom de la banque'
    },
    bankAccountNumber: {
      type: DataTypes.STRING,
      comment: 'Numéro de compte bancaire'
    },
    bankRoutingNumber: {
      type: DataTypes.STRING,
      comment: 'Code guichet/routing'
    },

    // Statut
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'on_leave', 'terminated'),
      defaultValue: 'active',
      comment: 'Statut de l\'employé'
    },

    // Champs de métadonnées
    notes: {
      type: DataTypes.TEXT,
      comment: 'Notes sur l\'employé'
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
    tableName: 'hr_employees',
    timestamps: true,
    comment: 'Table des employés',
    indexes: [
      {
        name: 'employee_number_idx',
        unique: true,
        fields: ['employeeNumber']
      },
      {
        name: 'employee_name_idx',
        fields: ['lastName', 'firstName']
      },
      {
        name: 'employee_status_idx',
        fields: ['status']
      }
    ]
  });

  // Associations
  Employee.associate = function(models) {
    // Un employé appartient à un département
    Employee.belongsTo(models.Department, {
      foreignKey: 'departmentId',
      as: 'department'
    });

    // Un employé occupe un poste
    Employee.belongsTo(models.Position, {
      foreignKey: 'positionId',
      as: 'position'
    });

    // Un employé peut avoir plusieurs contrats
    Employee.hasMany(models.Contract, {
      foreignKey: 'employeeId',
      as: 'contracts'
    });

    // Un employé peut avoir plusieurs demandes de congés
    Employee.hasMany(models.Leave, {
      foreignKey: 'employeeId',
      as: 'leaves'
    });

    // Note: Les associations suivantes sont commentées car les modèles n'existent pas encore

    // // Un employé peut avoir plusieurs présences
    // Employee.hasMany(models.Attendance, {
    //   foreignKey: 'employeeId',
    //   as: 'attendances'
    // });

    // // Un employé peut avoir plusieurs évaluations
    // Employee.hasMany(models.Evaluation, {
    //   foreignKey: 'employeeId',
    //   as: 'evaluations'
    // });

    // // Un employé peut avoir plusieurs documents
    // Employee.hasMany(models.EmployeeDocument, {
    //   foreignKey: 'employeeId',
    //   as: 'documents'
    // });

    // // Un employé peut avoir plusieurs compétences
    // Employee.belongsToMany(models.Skill, {
    //   through: models.EmployeeSkill,
    //   foreignKey: 'employeeId',
    //   otherKey: 'skillId',
    //   as: 'skills'
    // });

    // Un employé peut être manager d'autres employés
    Employee.belongsTo(models.Employee, {
      foreignKey: 'managerId',
      as: 'manager'
    });

    Employee.hasMany(models.Employee, {
      foreignKey: 'managerId',
      as: 'subordinates'
    });

    // // Un employé est lié à un utilisateur du système
    // Employee.belongsTo(models.User, {
    //   foreignKey: 'userId',
    //   as: 'user'
    // });
  };

  return Employee;
};
