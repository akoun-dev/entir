'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vérifier si des formats d'heure existent déjà
    const existingTimeFormats = await queryInterface.sequelize.query(
      'SELECT name FROM TimeFormats;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    ).catch(() => []);
    
    // Créer un ensemble de noms existants pour une recherche plus rapide
    const existingNames = new Set(existingTimeFormats.map(format => format.name));
    
    // Formats d'heure par défaut
    const defaultTimeFormats = [
      {
        name: '24 heures avec secondes',
        format: 'HH:mm:ss',
        example: '14:30:45',
        region: 'Europe',
        uses_24_hour: true,
        is_default: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '24 heures sans secondes',
        format: 'HH:mm',
        example: '14:30',
        region: 'Europe',
        uses_24_hour: true,
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '12 heures avec AM/PM',
        format: 'HH:mm a',
        example: '02:30 PM',
        region: 'Amérique du Nord',
        uses_24_hour: false,
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: '12 heures avec secondes et AM/PM',
        format: 'HH:mm:ss a',
        example: '02:30:45 PM',
        region: 'Amérique du Nord',
        uses_24_hour: false,
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Format militaire',
        format: 'HHmm',
        example: '1430',
        region: 'International',
        uses_24_hour: true,
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Filtrer les formats qui n'existent pas encore
    const formatsToInsert = defaultTimeFormats.filter(format => !existingNames.has(format.name));
    
    // Insérer les nouveaux formats s'il y en a
    if (formatsToInsert.length > 0) {
      await queryInterface.bulkInsert('TimeFormats', formatsToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TimeFormats', null, {});
  }
};
