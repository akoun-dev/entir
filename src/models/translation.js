'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Translation extends Model {
    static associate(models) {
      // Définir les associations ici si nécessaire
    }
  }
  Translation.init(
    {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locale: {
        type: DataTypes.STRING(5),
        allowNull: false,
        field: 'locale'
      },
      namespace: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'common',
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_default'
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'description'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Translation',
      indexes: [
        {
          unique: true,
          fields: ['key', 'locale', 'namespace']
        }
      ]
    }
  );
  return Translation;
};
