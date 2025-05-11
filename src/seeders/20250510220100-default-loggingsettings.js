'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('LoggingSettings', [
      {
        key: 'level',
        value: 'info',
        description: 'Niveau de détail des logs (error, warn, info, debug, trace)',
        valueType: 'string',
        category: 'logging',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'retentionDays',
        value: '30',
        description: 'Nombre de jours de conservation des logs avant suppression',
        valueType: 'number',
        category: 'logging',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'maxSize',
        value: '100',
        description: 'Taille maximale des fichiers de log en MB avant rotation',
        valueType: 'number',
        category: 'logging',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'compress',
        value: 'true',
        description: 'Compression des fichiers de log archivés',
        valueType: 'boolean',
        category: 'logging',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'consoleOutput',
        value: 'false',
        description: 'Affichage des logs dans la console en plus des fichiers',
        valueType: 'boolean',
        category: 'logging',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'logDirectory',
        value: './logs',
        description: 'Répertoire de stockage des fichiers de log',
        valueType: 'string',
        category: 'logging',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'filePattern',
        value: 'app-%DATE%.log',
        description: 'Format de nommage des fichiers de log',
        valueType: 'string',
        category: 'logging',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'datePattern',
        value: 'YYYY-MM-DD',
        description: 'Format de date pour la rotation des logs',
        valueType: 'string',
        category: 'logging',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'maxFiles',
        value: '14',
        description: 'Nombre maximum de fichiers de log à conserver',
        valueType: 'number',
        category: 'logging',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('LoggingSettings', null, {});
  }
};
