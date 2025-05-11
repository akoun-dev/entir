'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sequences', [
      {
        name: 'Factures clients',
        prefix: 'FAC-',
        suffix: '',
        nextNumber: 1245,
        padding: 5,
        resetFrequency: 'yearly',
        documentType: 'invoice',
        lastReset: new Date(new Date().getFullYear(), 0, 1), // 1er janvier de l'année en cours
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Devis',
        prefix: 'DEV-',
        suffix: '',
        nextNumber: 378,
        padding: 4,
        resetFrequency: 'never',
        documentType: 'quote',
        lastReset: null,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Commandes',
        prefix: 'CMD-',
        suffix: `-${new Date().getFullYear()}`,
        nextNumber: 892,
        padding: 6,
        resetFrequency: 'yearly',
        documentType: 'order',
        lastReset: new Date(new Date().getFullYear(), 0, 1), // 1er janvier de l'année en cours
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bons de livraison',
        prefix: 'BL-',
        suffix: '',
        nextNumber: 456,
        padding: 5,
        resetFrequency: 'monthly',
        documentType: 'delivery',
        lastReset: new Date(new Date().getFullYear(), new Date().getMonth(), 1), // 1er jour du mois en cours
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Avoirs',
        prefix: 'AV-',
        suffix: '',
        nextNumber: 123,
        padding: 4,
        resetFrequency: 'yearly',
        documentType: 'credit_note',
        lastReset: new Date(new Date().getFullYear(), 0, 1), // 1er janvier de l'année en cours
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sequences', null, {});
  }
};
