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
    
    // Budget et informations financières
    budget: {
      type: DataTypes.DECIMAL(15, 2),
      comment: 'Budget alloué au département'
    },
    costCenter: {
      type: DataTypes.STRING,
      comment: 'Centre de coût associé au département'
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
    
    // Un département peut avoir un département parent (structure hiérarchique)
    Department.belongsTo(models.Department, {
      foreignKey: 'parentId',
      as: 'parent'
    });
    
    Department.hasMany(models.Department, {
      foreignKey: 'parentId',
      as: 'children'
    });
  };

  return Department;
};
