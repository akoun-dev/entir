'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vérifier si des langues existent déjà
    const existingLanguages = await queryInterface.sequelize.query(
      'SELECT code FROM Languages;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const existingCodes = existingLanguages.map(language => language.code);
    
    // Langues par défaut
    const defaultLanguages = [
      {
        name: 'Français',
        code: 'fr-FR',
        native_name: 'Français',
        direction: 'ltr',
        is_default: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'English (US)',
        code: 'en-US',
        native_name: 'English',
        direction: 'ltr',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'English (UK)',
        code: 'en-GB',
        native_name: 'English',
        direction: 'ltr',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Español',
        code: 'es-ES',
        native_name: 'Español',
        direction: 'ltr',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Deutsch',
        code: 'de-DE',
        native_name: 'Deutsch',
        direction: 'ltr',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Italiano',
        code: 'it-IT',
        native_name: 'Italiano',
        direction: 'ltr',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nederlands',
        code: 'nl-NL',
        native_name: 'Nederlands',
        direction: 'ltr',
        is_default: false,
        active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'العربية',
        code: 'ar-SA',
        native_name: 'العربية',
        direction: 'rtl',
        is_default: false,
        active: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Filtrer les langues qui n'existent pas encore
    const languagesToInsert = defaultLanguages.filter(language => !existingCodes.includes(language.code));
    
    // Insérer les nouvelles langues s'il y en a
    if (languagesToInsert.length > 0) {
      await queryInterface.bulkInsert('Languages', languagesToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Languages', null, {});
  }
};
