'use strict';

/**
 * Modèle Position (Poste)
 * 
 * Représente un poste ou une fonction dans l'entreprise
 */
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    // Identifiant unique
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    // Informations du poste
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Nom du poste'
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Code unique du poste'
    },
    description: {
      type: DataTypes.TEXT,
      comment: 'Description du poste'
    },
    
    // Niveau hiérarchique et classification
    level: {
      type: DataTypes.INTEGER,
      comment: 'Niveau hiérarchique du poste (1 = plus bas, 10 = plus élevé)'
    },
    category: {
      type: DataTypes.STRING,
      comment: 'Catégorie du poste (ex: technique, administratif, management)'
    },
    
    // Informations salariales
    minSalary: {
      type: DataTypes.DECIMAL(15, 2),
      comment: 'Salaire minimum pour ce poste'
    },
    maxSalary: {
      type: DataTypes.DECIMAL(15, 2),
      comment: 'Salaire maximum pour ce poste'
    },
    
    // Statut
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Indique si le poste est actif'
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
    tableName: 'hr_positions',
    timestamps: true,
    comment: 'Table des postes',
    indexes: [
      {
        name: 'position_code_idx',
        unique: true,
        fields: ['code']
      },
      {
        name: 'position_name_idx',
        fields: ['name']
      },
      {
        name: 'position_active_idx',
        fields: ['active']
      },
      {
        name: 'position_level_idx',
        fields: ['level']
      }
    ]
  });

  // Associations
  Position.associate = function(models) {
    // Un poste appartient à un département
    Position.belongsTo(models.Department, {
      foreignKey: 'departmentId',
      as: 'department'
    });
    
    // Un poste peut avoir plusieurs employés
    Position.hasMany(models.Employee, {
      foreignKey: 'positionId',
      as: 'employees'
    });
  };

  return Position;
};
