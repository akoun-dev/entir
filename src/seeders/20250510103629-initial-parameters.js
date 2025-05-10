'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vérifier si des paramètres existent déjà
    const existingParameters = await queryInterface.sequelize.query(
      'SELECT key FROM Parameters;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const existingKeys = existingParameters.map(param => param.key);

    // Paramètres initiaux
    const initialParameters = [
      {
        key: 'compliance_enabled',
        value: 'true',
        category: 'compliance',
        description: 'Activer ou désactiver la conformité réglementaire',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'default_shipping_method',
        value: 'standard',
        category: 'shipping',
        description: 'Méthode d\'expédition par défaut',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        key: 'currency_format',
        value: 'USD',
        category: 'numberFormats',
        description: 'Format de devise par défaut',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Filtrer les paramètres qui n'existent pas encore
    const parametersToInsert = initialParameters.filter(param => !existingKeys.includes(param.key));

    // Insérer les nouveaux paramètres s'il y en a
    if (parametersToInsert.length > 0) {
      await queryInterface.bulkInsert('Parameters', parametersToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Parameters', null, {});
  },
};
