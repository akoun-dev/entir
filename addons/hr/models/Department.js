'use strict';

/**
 * Modèle Department (Département)
 *
 * Représente un département ou une unité organisationnelle dans l'entreprise
 */
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    // Identifiant unique
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    // Informations du département
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Nom du département'
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Code unique du département'
    },
    description: {
      type: DataTypes.TEXT,
      comment: 'Description du département'
    },

    // Statut
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Indique si le département est actif'
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
    complete_name: {
      type: DataTypes.VIRTUAL,
      comment: 'Nom complet incluant la hiérarchie des départements parents'
    },

    // Budget et informations financières
    budget: {
      type: DataTypes.DECIMAL(15, 2),
      comment: 'Budget alloué au département'
    },
    costCenter: {
      type: DataTypes.STRING,
      comment: 'Centre de coût associé au département'
    },

    // Champs pour l'interface utilisateur
    company_id: {
      type: DataTypes.INTEGER,
      comment: 'ID de la société'
    },
    parent_id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.parentId;
      },
      set(value) {
        this.setDataValue('parentId', value);
      },
      comment: 'Alias pour parentId (virtuel)'
    },
    manager_id: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.managerId;
      },
      set(value) {
        this.setDataValue('managerId', value);
      },
      comment: 'Alias pour managerId (virtuel)'
    },
    total_employee: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.getEmployeeCount();
      },
      comment: 'Nombre total d\'employés (virtuel)'
    },
    note: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.description;
      },
      set(value) {
        this.setDataValue('description', value);
      },
      comment: 'Alias pour description (virtuel)'
    },
    color: {
      type: DataTypes.INTEGER,
      comment: 'Couleur pour l\'affichage dans l\'interface'
    },
    parent_path: {
      type: DataTypes.STRING,
      comment: 'Chemin hiérarchique des départements parents'
    },
    master_department_id: {
      type: DataTypes.INTEGER,
      comment: 'ID du département principal'
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
    tableName: 'hr_departments',
    timestamps: true,
    comment: 'Table des départements',
    indexes: [
      {
        name: 'department_code_idx',
        unique: true,
        fields: ['code']
      },
      {
        name: 'department_name_idx',
        fields: ['name']
      },
      {
        name: 'department_active_idx',
        fields: ['active']
      }
    ]
  });

  // Associations
  Department.associate = function(models) {
    // Un département peut avoir plusieurs employés
    Department.hasMany(models.Employee, {
      foreignKey: 'departmentId',
      as: 'employees'
    });

    // Ajouter un getter pour le nombre d'employés
    Department.prototype.getEmployeeCount = async function() {
      return await models.Employee.count({
        where: { departmentId: this.id, active: true }
      });
    };

    // Définir une propriété virtuelle pour employee_count
    Object.defineProperty(Department.prototype, 'employee_count', {
      get: async function() {
        return await this.getEmployeeCount();
      }
    });

    // Un département peut avoir plusieurs postes
    Department.hasMany(models.Position, {
      foreignKey: 'departmentId',
      as: 'positions'
    });

    // Un département peut avoir un responsable
    Department.belongsTo(models.Employee, {
      foreignKey: 'managerId',
      as: 'manager'
    });

    // Ajouter un getter pour le nom du manager
    Department.prototype.getManagerName = async function() {
      if (this.manager) {
        return this.manager.name;
      }

      if (this.managerId) {
        const manager = await models.Employee.findByPk(this.managerId);
        return manager ? manager.name : null;
      }

      return null;
    };

    // Un département peut avoir un département parent (structure hiérarchique)
    Department.belongsTo(models.Department, {
      foreignKey: 'parentId',
      as: 'parent'
    });

    // Ajouter un getter pour le nom du département parent
    Department.prototype.getParentName = async function() {
      if (this.parent) {
        return this.parent.name;
      }

      if (this.parentId) {
        const parent = await models.Department.findByPk(this.parentId);
        return parent ? parent.name : null;
      }

      return null;
    };

    Department.hasMany(models.Department, {
      foreignKey: 'parentId',
      as: 'children'
    });

    // Ajouter un getter pour le nombre de sous-départements
    Department.prototype.getSubDepartmentsCount = async function() {
      return await models.Department.count({
        where: { parentId: this.id, active: true }
      });
    };

    // Méthode pour générer le nom complet incluant la hiérarchie
    Department.prototype.generateCompleteName = async function() {
      let completeName = this.name;
      let currentDept = this;

      while (currentDept.parentId) {
        const parent = await models.Department.findByPk(currentDept.parentId);
        if (!parent) break;

        completeName = `${parent.name} / ${completeName}`;
        currentDept = parent;
      }

      return completeName;
    };
  };

  return Department;
};
