'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Translations', [{
      key: 'welcome',
      locale: 'fr',
      namespace: 'common',
      value: 'Bienvenue',
      is_default: 1,
      active: 1,
      description: 'Message de bienvenue principal',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      key: 'login',
      locale: 'fr',
      namespace: 'auth',
      value: 'Connexion',
      is_default: 1,
      active: 1,
      description: 'Texte du bouton de connexion',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      key: 'logout',
      locale: 'fr',
      namespace: 'auth',
      value: 'Déconnexion',
      is_default: 1,
      active: 1,
      description: 'Texte du bouton de déconnexion',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Translations', null, {});
  }
};
