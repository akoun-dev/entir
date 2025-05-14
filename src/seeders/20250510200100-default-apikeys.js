'use strict';
const crypto = require('crypto');

// Fonction pour générer une clé API
const generateKey = () => 'sk_' + crypto.randomBytes(24).toString('hex');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ApiKeys', [
      {
        name: 'Application mobile',
        key: generateKey(),
        permissions: JSON.stringify(['read', 'write']),
        active: true,
        description: 'Clé API pour l\'application mobile',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Intégration CRM',
        key: generateKey(),
        permissions: JSON.stringify(['read']),
        active: false,
        description: 'Clé API pour l\'intégration avec le CRM',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Webhook externe',
        key: generateKey(),
        permissions: JSON.stringify(['read', 'write', 'webhook']),
        active: true,
        description: 'Clé API pour les webhooks externes',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ApiKeys', null, {});
  }
};
