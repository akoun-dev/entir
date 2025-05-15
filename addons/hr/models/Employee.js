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
    name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        const names = value.split(' ');
        this.setDataValue('firstName', names.shift() || '');
        this.setDataValue('lastName', names.join(' ') || '');
      },
      comment: 'Nom complet de l\'employé (virtuel)'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      },
      comment: 'Adresse email personnelle'
    },
    work_email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      },
      comment: 'Adresse email professionnelle'
    },
    phone: {
      type: DataTypes.STRING,
      comment: 'Numéro de téléphone personnel'
    },
    work_phone: {
      type: DataTypes.STRING,
      comment: 'Numéro de téléphone professionnel'
    },
    mobile_phone: {
      type: DataTypes.STRING,
      comment: 'Numéro de téléphone mobile'
    },
    birthDate: {
      type: DataTypes.DATEONLY,
      comment: 'Date de naissance'
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      comment: 'Genre'
    },
    photo: {
      type: DataTypes.TEXT('long'),
      comment: 'Photo de profil (URL ou base64)'
    },

    // Informations professionnelles
    employeeNumber: {
      type: DataTypes.STRING,
      unique: true,
      comment: 'Numéro d\'employé unique'
    },
    job_title: {
      type: DataTypes.STRING,
      comment: 'Intitulé du poste'
    },
    department_name: {
      type: DataTypes.VIRTUAL,
      comment: 'Nom du département (virtuel, calculé à partir de l\'association)'
    },
    employment_type: {
      type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship', 'temporary'),
      defaultValue: 'full-time',
      comment: 'Type d\'emploi'
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
      comment: 'Statut détaillé de l\'employé'
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Indique si l\'employé est actif (true) ou inactif (false)'
    },
    is_active: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.active;
      },
      set(value) {
        this.setDataValue('active', value);
      },
      comment: 'Alias pour le champ active (virtuel)'
    },

    // Champs de métadonnées
    notes: {
      type: DataTypes.TEXT,
      comment: 'Notes sur l\'employé'
    },

    // Champs pour l'organigramme et l'interface utilisateur
    manager_name: {
      type: DataTypes.VIRTUAL,
      comment: 'Nom du manager (virtuel, calculé à partir de l\'association)'
    },
    birth_date: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.birthDate;
      },
      set(value) {
        this.setDataValue('birthDate', value);
      },
      comment: 'Alias pour birthDate (virtuel)'
    },
    hire_date: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.hireDate;
      },
      set(value) {
        this.setDataValue('hireDate', value);
      },
      comment: 'Alias pour hireDate (virtuel)'
    },
    position: {
      type: DataTypes.STRING,
      comment: 'Position dans l\'organigramme'
    },
    parent_id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.managerId;
      },
      set(value) {
        this.setDataValue('managerId', value);
      },
      comment: 'Alias pour managerId (virtuel)'
    },
    children: {
      type: DataTypes.VIRTUAL,
      comment: 'IDs des subordonnés directs (virtuel)'
    },
    level: {
      type: DataTypes.INTEGER,
      comment: 'Niveau hiérarchique dans l\'organigramme'
    },
    org_unit_id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.departmentId;
      },
      set(value) {
        this.setDataValue('departmentId', value);
      },
      comment: 'Alias pour departmentId (virtuel)'
    },
    org_unit_path: {
      type: DataTypes.STRING,
      comment: 'Chemin des unités organisationnelles'
    },
    location: {
      type: DataTypes.STRING,
      comment: 'Emplacement physique ou bureau'
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

    // Définir un getter pour department_name
    Employee.prototype.getDepartmentName = async function() {
      if (this.department) {
        return this.department.name;
      }

      if (this.departmentId) {
        const department = await models.Department.findByPk(this.departmentId);
        return department ? department.name : null;
      }

      return null;
    };

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

    // Définir un getter pour manager_name
    Employee.prototype.getManagerName = async function() {
      if (this.manager) {
        return this.manager.name;
      }

      if (this.managerId) {
        const manager = await models.Employee.findByPk(this.managerId);
        return manager ? manager.name : null;
      }

      return null;
    };

    // // Un employé est lié à un utilisateur du système
    // Employee.belongsTo(models.User, {
    //   foreignKey: 'userId',
    //   as: 'user'
    // });
  };

  return Employee;
};
