'use strict';

/**
 * Modèle LeaveType (Type de congé)
 * 
 * Représente un type de congé disponible dans l'entreprise
 */
module.exports = (sequelize, DataTypes) => {
  const LeaveType = sequelize.define('LeaveType', {
    // Identifiant unique
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    
    // Informations du type de congé
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Nom du type de congé'
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: 'Code unique du type de congé'
    },
    description: {
      type: DataTypes.TEXT,
      comment: 'Description du type de congé'
    },
    
    // Configuration
    color: {
      type: DataTypes.STRING,
      comment: 'Couleur associée à ce type de congé pour l\'affichage'
    },
    icon: {
      type: DataTypes.STRING,
      comment: 'Icône associée à ce type de congé'
    },
    
    // Allocation
    allowance: {
      type: DataTypes.DECIMAL(5, 2),
      comment: 'Nombre de jours alloués par an (null = illimité)'
    },
    
    // Paramètres
    requiresApproval: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Indique si ce type de congé nécessite une approbation'
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Indique si ce type de congé est payé'
    },
    
    // Statut
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      comment: 'Indique si ce type de congé est actif'
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
    tableName: 'hr_leave_types',
    timestamps: true,
    comment: 'Table des types de congés',
    indexes: [
      {
        name: 'leave_type_code_idx',
        unique: true,
        fields: ['code']
      },
      {
        name: 'leave_type_name_idx',
        fields: ['name']
      },
      {
        name: 'leave_type_active_idx',
        fields: ['active']
      }
    ]
  });

  // Associations
  LeaveType.associate = function(models) {
    // Un type de congé peut être utilisé dans plusieurs demandes de congés
    LeaveType.hasMany(models.Leave, {
      foreignKey: 'leaveTypeId',
      as: 'leaves'
    });
  };

  return LeaveType;
};
