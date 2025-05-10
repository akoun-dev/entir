'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vérifier si des formats de date existent déjà
    const existingFormats = await queryInterface.sequelize.query(
      'SELECT format FROM DateFormats;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const existingFormatStrings = existingFormats.map(format => format.format);
    
    // Formats de date par défaut
    const defaultDateFormats = [
      {
        name: 'Format français',
        format: 'DD/MM/YYYY',
        description: 'Format de date français (jour/mois/année)',
        type: 'date',
        is_default: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Format américain',
        format: 'MM/DD/YYYY',
        description: 'Format de date américain (mois/jour/année)',
        type: 'date',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Format ISO',
        format: 'YYYY-MM-DD',
        description: 'Format de date ISO (année-mois-jour)',
        type: 'date',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Format long',
        format: 'D MMMM YYYY',
        description: 'Format de date long (1 janvier 2023)',
        type: 'date',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Heure 24h',
        format: 'HH:mm',
        description: 'Format d\'heure 24h (14:30)',
        type: 'time',
        is_default: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Heure 12h',
        format: 'hh:mm A',
        description: 'Format d\'heure 12h (02:30 PM)',
        type: 'time',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Date et heure standard',
        format: 'DD/MM/YYYY HH:mm',
        description: 'Format de date et heure standard (31/12/2023 23:59)',
        type: 'datetime',
        is_default: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Date et heure ISO',
        format: 'YYYY-MM-DD HH:mm:ss',
        description: 'Format de date et heure ISO (2023-12-31 23:59:59)',
        type: 'datetime',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Filtrer les formats qui n'existent pas encore
    const formatsToInsert = defaultDateFormats.filter(format => !existingFormatStrings.includes(format.format));
    
    // Insérer les nouveaux formats s'il y en a
    if (formatsToInsert.length > 0) {
      await queryInterface.bulkInsert('DateFormats', formatsToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DateFormats', null, {});
  }
};
