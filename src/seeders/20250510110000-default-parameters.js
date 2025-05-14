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

    // Paramètres par défaut
    const defaultParameters = [
      // Paramètres de l'entreprise
      {
        key: 'company_name',
        value: 'Ma Société',
        category: 'company',
        description: 'Nom de l\'entreprise',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'company_address',
        value: '123 Rue Principale',
        category: 'company',
        description: 'Adresse de l\'entreprise',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'company_phone',
        value: '+33 1 23 45 67 89',
        category: 'company',
        description: 'Téléphone de l\'entreprise',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'company_email',
        value: 'contact@masociete.com',
        category: 'company',
        description: 'Email de contact de l\'entreprise',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Paramètres d'apparence
      {
        key: 'theme',
        value: 'light',
        category: 'appearance',
        description: 'Thème de l\'interface utilisateur',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'primary_color',
        value: '#FF6B00',
        category: 'appearance',
        description: 'Couleur principale de l\'interface',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Paramètres de localisation
      {
        key: 'default_language',
        value: 'fr',
        category: 'localization',
        description: 'Langue par défaut',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'default_currency',
        value: 'EUR',
        category: 'localization',
        description: 'Devise par défaut',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'date_format',
        value: 'DD/MM/YYYY',
        category: 'localization',
        description: 'Format de date par défaut',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Paramètres système
      {
        key: 'backup_enabled',
        value: 'true',
        category: 'system',
        description: 'Activation des sauvegardes automatiques',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'backup_frequency',
        value: 'daily',
        category: 'system',
        description: 'Fréquence des sauvegardes',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Filtrer les paramètres qui n'existent pas encore
    const parametersToInsert = defaultParameters.filter(param => !existingKeys.includes(param.key));

    // Insérer les nouveaux paramètres s'il y en a
    if (parametersToInsert.length > 0) {
      await queryInterface.bulkInsert('Parameters', parametersToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Parameters', null, {});
  }
};
