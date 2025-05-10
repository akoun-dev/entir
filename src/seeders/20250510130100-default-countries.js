'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vérifier si des pays existent déjà
    const existingCountries = await queryInterface.sequelize.query(
      'SELECT code FROM Countries;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const existingCodes = existingCountries.map(country => country.code);
    
    // Pays par défaut
    const defaultCountries = [
      {
        name: 'France',
        code: 'FR',
        phone_code: '+33',
        currency_code: 'EUR',
        region: 'Europe',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'États-Unis',
        code: 'US',
        phone_code: '+1',
        currency_code: 'USD',
        region: 'Amérique du Nord',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Royaume-Uni',
        code: 'GB',
        phone_code: '+44',
        currency_code: 'GBP',
        region: 'Europe',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Allemagne',
        code: 'DE',
        phone_code: '+49',
        currency_code: 'EUR',
        region: 'Europe',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Espagne',
        code: 'ES',
        phone_code: '+34',
        currency_code: 'EUR',
        region: 'Europe',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Italie',
        code: 'IT',
        phone_code: '+39',
        currency_code: 'EUR',
        region: 'Europe',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Canada',
        code: 'CA',
        phone_code: '+1',
        currency_code: 'CAD',
        region: 'Amérique du Nord',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Japon',
        code: 'JP',
        phone_code: '+81',
        currency_code: 'JPY',
        region: 'Asie',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Australie',
        code: 'AU',
        phone_code: '+61',
        currency_code: 'AUD',
        region: 'Océanie',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Brésil',
        code: 'BR',
        phone_code: '+55',
        currency_code: 'BRL',
        region: 'Amérique du Sud',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Filtrer les pays qui n'existent pas encore
    const countriesToInsert = defaultCountries.filter(country => !existingCodes.includes(country.code));
    
    // Insérer les nouveaux pays s'il y en a
    if (countriesToInsert.length > 0) {
      await queryInterface.bulkInsert('Countries', countriesToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Countries', null, {});
  }
};
