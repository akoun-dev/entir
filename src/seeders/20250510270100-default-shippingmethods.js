'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ShippingMethods', [
      {
        name: 'Standard',
        carrier: 'La Poste',
        deliveryTime: '2-5 jours',
        price: '5.99€',
        isActive: true,
        description: 'Livraison standard par La Poste en 2 à 5 jours ouvrés.',
        pricingRules: JSON.stringify({
          base_price: 5.99,
          weight_tiers: [
            { max_weight: 1, price: 5.99 },
            { max_weight: 2, price: 7.99 },
            { max_weight: 5, price: 9.99 },
            { max_weight: 10, price: 14.99 }
          ]
        }),
        availableCountries: JSON.stringify(['FR']),
        maxWeight: 10.0,
        maxDimensions: JSON.stringify({
          length: 100,
          width: 50,
          height: 50,
          unit: 'cm'
        }),
        trackingInfo: JSON.stringify({
          has_tracking: true,
          tracking_url: 'https://www.laposte.fr/outils/suivre-vos-envois?code={tracking_number}'
        }),
        displayOrder: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Express',
        carrier: 'UPS',
        deliveryTime: '24h',
        price: '12.99€',
        isActive: true,
        description: 'Livraison express par UPS en 24h garantie.',
        pricingRules: JSON.stringify({
          base_price: 12.99,
          weight_tiers: [
            { max_weight: 1, price: 12.99 },
            { max_weight: 2, price: 14.99 },
            { max_weight: 5, price: 19.99 },
            { max_weight: 10, price: 24.99 }
          ]
        }),
        availableCountries: JSON.stringify(['FR', 'BE', 'LU', 'DE', 'CH']),
        maxWeight: 20.0,
        maxDimensions: JSON.stringify({
          length: 120,
          width: 80,
          height: 80,
          unit: 'cm'
        }),
        trackingInfo: JSON.stringify({
          has_tracking: true,
          tracking_url: 'https://www.ups.com/track?tracknum={tracking_number}'
        }),
        displayOrder: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Point Relais',
        carrier: 'Mondial Relay',
        deliveryTime: '3-7 jours',
        price: '4.99€',
        isActive: false,
        description: 'Livraison économique en point relais Mondial Relay.',
        pricingRules: JSON.stringify({
          base_price: 4.99,
          weight_tiers: [
            { max_weight: 1, price: 4.99 },
            { max_weight: 2, price: 5.99 },
            { max_weight: 5, price: 7.99 },
            { max_weight: 10, price: 9.99 }
          ]
        }),
        availableCountries: JSON.stringify(['FR', 'BE', 'LU', 'ES']),
        maxWeight: 30.0,
        maxDimensions: JSON.stringify({
          length: 150,
          width: 100,
          height: 100,
          unit: 'cm'
        }),
        trackingInfo: JSON.stringify({
          has_tracking: true,
          tracking_url: 'https://www.mondialrelay.fr/suivi-de-colis/?numeroExpedition={tracking_number}'
        }),
        displayOrder: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ShippingMethods', null, {});
  }
};
