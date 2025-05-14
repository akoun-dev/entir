'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vérifier si des formats de nombre existent déjà
    const existingNumberFormats = await queryInterface.sequelize.query(
      'SELECT name FROM NumberFormats;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    ).catch(() => []);
    
    // Créer un ensemble de noms existants pour une recherche plus rapide
    const existingNames = new Set(existingNumberFormats.map(format => format.name));
    
    // Formats de nombre par défaut
    const defaultNumberFormats = [
      {
        name: 'Standard français',
        decimal_separator: ',',
        thousands_separator: ' ',
        decimal_places: 2,
        currency_display: 'symbol',
        is_default: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Standard américain',
        decimal_separator: '.',
        thousands_separator: ',',
        decimal_places: 2,
        currency_display: 'symbol',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Standard britannique',
        decimal_separator: '.',
        thousands_separator: ',',
        decimal_places: 2,
        currency_display: 'symbol',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Standard allemand',
        decimal_separator: ',',
        thousands_separator: '.',
        decimal_places: 2,
        currency_display: 'symbol',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Standard indien',
        decimal_separator: '.',
        thousands_separator: ',',
        decimal_places: 2,
        currency_display: 'symbol',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Filtrer les formats qui n'existent pas encore
    const formatsToInsert = defaultNumberFormats.filter(format => !existingNames.has(format.name));
    
    // Insérer les nouveaux formats s'il y en a
    if (formatsToInsert.length > 0) {
      await queryInterface.bulkInsert('NumberFormats', formatsToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('NumberFormats', null, {});
  }
};
