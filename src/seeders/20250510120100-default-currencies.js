'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vérifier si des devises existent déjà
    const existingCurrencies = await queryInterface.sequelize.query(
      'SELECT code FROM Currencies;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const existingCodes = existingCurrencies.map(currency => currency.code);
    
    // Devises par défaut
    const defaultCurrencies = [
      {
        name: 'Euro',
        symbol: '€',
        code: 'EUR',
        rate: 1.0,
        position: 'after',
        decimal_places: 2,
        rounding: 0.01,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dollar américain',
        symbol: '$',
        code: 'USD',
        rate: 1.08,
        position: 'before',
        decimal_places: 2,
        rounding: 0.01,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Livre sterling',
        symbol: '£',
        code: 'GBP',
        rate: 0.85,
        position: 'before',
        decimal_places: 2,
        rounding: 0.01,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Franc suisse',
        symbol: 'CHF',
        code: 'CHF',
        rate: 0.96,
        position: 'after',
        decimal_places: 2,
        rounding: 0.01,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Yen japonais',
        symbol: '¥',
        code: 'JPY',
        rate: 160.45,
        position: 'before',
        decimal_places: 0,
        rounding: 1.0,
        active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Filtrer les devises qui n'existent pas encore
    const currenciesToInsert = defaultCurrencies.filter(currency => !existingCodes.includes(currency.code));
    
    // Insérer les nouvelles devises s'il y en a
    if (currenciesToInsert.length > 0) {
      await queryInterface.bulkInsert('Currencies', currenciesToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Currencies', null, {});
  }
};
