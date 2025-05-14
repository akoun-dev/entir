'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currentYear = new Date().getFullYear();
    
    await queryInterface.bulkInsert('Holidays', [
      {
        name: 'Jour de l\'An',
        date: `${currentYear}-01-01`,
        country: 'France',
        recurring: true,
        type: 'national',
        description: 'Premier jour de l\'année',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lundi de Pâques',
        date: `${currentYear}-04-10`,
        country: 'France',
        recurring: true,
        type: 'national',
        description: 'Lundi suivant le dimanche de Pâques',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fête du Travail',
        date: `${currentYear}-05-01`,
        country: 'France',
        recurring: true,
        type: 'national',
        description: 'Journée internationale des travailleurs',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Victoire 1945',
        date: `${currentYear}-05-08`,
        country: 'France',
        recurring: true,
        type: 'national',
        description: 'Commémoration de la fin de la Seconde Guerre mondiale en Europe',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ascension',
        date: `${currentYear}-05-18`,
        country: 'France',
        recurring: true,
        type: 'national',
        description: 'Célébration de l\'ascension de Jésus au ciel',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Lundi de Pentecôte',
        date: `${currentYear}-05-29`,
        country: 'France',
        recurring: true,
        type: 'national',
        description: 'Lundi suivant la Pentecôte',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fête Nationale',
        date: `${currentYear}-07-14`,
        country: 'France',
        recurring: true,
        type: 'national',
        description: 'Commémoration de la prise de la Bastille',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Assomption',
        date: `${currentYear}-08-15`,
        country: 'France',
        recurring: true,
        type: 'national',
        description: 'Célébration de l\'assomption de Marie',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Toussaint',
        date: `${currentYear}-11-01`,
        country: 'France',
        recurring: true,
        type: 'national',
        description: 'Fête de tous les saints',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Armistice 1918',
        date: `${currentYear}-11-11`,
        country: 'France',
        recurring: true,
        type: 'national',
        description: 'Commémoration de l\'armistice de la Première Guerre mondiale',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Noël',
        date: `${currentYear}-12-25`,
        country: 'France',
        recurring: true,
        type: 'national',
        description: 'Fête de la nativité',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Journée de l\'entreprise',
        date: `${currentYear}-06-15`,
        country: 'France',
        recurring: true,
        type: 'entreprise',
        description: 'Journée spéciale de l\'entreprise',
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Holidays', null, {});
  }
};
