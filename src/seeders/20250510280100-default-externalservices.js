'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ExternalServices', [
      {
        name: 'Google Maps',
        type: 'Cartographie',
        apiKey: 'AIzaSyA_sample_key_for_development',
        apiSecret: null,
        baseUrl: 'https://maps.googleapis.com/maps/api',
        config: JSON.stringify({
          libraries: ['places', 'geocoding', 'directions'],
          region: 'FR',
          language: 'fr'
        }),
        isActive: true,
        mode: 'test',
        webhookUrl: null,
        authInfo: null,
        tokenExpiry: null,
        lastSyncStatus: 'success',
        lastSyncDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SendGrid',
        type: 'Email',
        apiKey: 'SG.sample_key_for_development',
        apiSecret: null,
        baseUrl: 'https://api.sendgrid.com/v3',
        config: JSON.stringify({
          from_email: 'contact@example.com',
          from_name: 'Entreprise SAS',
          templates: {
            welcome: 'd-sample-template-id-1',
            order_confirmation: 'd-sample-template-id-2',
            password_reset: 'd-sample-template-id-3'
          }
        }),
        isActive: false,
        mode: 'test',
        webhookUrl: '/api/webhooks/sendgrid',
        authInfo: null,
        tokenExpiry: null,
        lastSyncStatus: null,
        lastSyncDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Stripe',
        type: 'Paiement',
        apiKey: 'pk_test_sample_key_for_development',
        apiSecret: 'sk_test_sample_secret_for_development',
        baseUrl: 'https://api.stripe.com/v1',
        config: JSON.stringify({
          webhook_secret: 'whsec_sample_webhook_secret',
          payment_methods: ['card', 'sepa_debit', 'ideal'],
          currency: 'eur'
        }),
        isActive: true,
        mode: 'test',
        webhookUrl: '/api/webhooks/stripe',
        authInfo: null,
        tokenExpiry: null,
        lastSyncStatus: 'success',
        lastSyncDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ExternalServices', null, {});
  }
};
