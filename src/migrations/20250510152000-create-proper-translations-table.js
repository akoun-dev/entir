'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Translations', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false
      },
      locale: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      namespace: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'common'
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      is_default: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('Translations', {
      fields: ['key', 'locale', 'namespace'],
      unique: true
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Translations');
  }
};
