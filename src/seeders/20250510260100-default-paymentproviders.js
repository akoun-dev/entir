'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PaymentProviders', [
      {
        name: 'Stripe',
        type: 'Carte bancaire',
        apiKey: 'pk_test_sample_key',
        apiSecret: 'sk_test_sample_secret',
        config: JSON.stringify({
          checkout_mode: 'redirect',
          capture_method: 'automatic',
          payment_methods: ['card', 'sepa_debit', 'ideal']
        }),
        fees: '1.4% + 0.25€',
        isActive: true,
        mode: 'test',
        webhookUrl: '/api/webhooks/stripe',
        supportedMethods: JSON.stringify(['card', 'sepa_debit', 'ideal']),
        supportedCurrencies: JSON.stringify(['EUR', 'USD', 'GBP']),
        supportedCountries: JSON.stringify(['FR', 'DE', 'IT', 'ES', 'UK', 'US']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'PayPal',
        type: 'Portefeuille électronique',
        apiKey: 'client_id_sample',
        apiSecret: 'client_secret_sample',
        config: JSON.stringify({
          checkout_mode: 'redirect',
          intent: 'CAPTURE',
          landing_page: 'LOGIN'
        }),
        fees: '2.9% + 0.30€',
        isActive: false,
        mode: 'test',
        webhookUrl: '/api/webhooks/paypal',
        supportedMethods: JSON.stringify(['paypal', 'card']),
        supportedCurrencies: JSON.stringify(['EUR', 'USD', 'GBP']),
        supportedCountries: JSON.stringify(['FR', 'DE', 'IT', 'ES', 'UK', 'US']),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Virement bancaire',
        type: 'Virement',
        apiKey: null,
        apiSecret: null,
        config: JSON.stringify({
          account_name: 'Entreprise SAS',
          iban: 'FR76••••••••••••••••••••••',
          bic: 'ABCDEFGHXXX',
          bank_name: 'Banque Exemple'
        }),
        fees: '0%',
        isActive: true,
        mode: 'production',
        webhookUrl: null,
        supportedMethods: JSON.stringify(['bank_transfer']),
        supportedCurrencies: JSON.stringify(['EUR']),
        supportedCountries: JSON.stringify(['FR']),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PaymentProviders', null, {});
  }
};
