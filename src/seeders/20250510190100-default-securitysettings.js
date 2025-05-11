'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SecuritySettings', [
      {
        key: 'password_complexity',
        value: 'true',
        description: 'Exiger des mots de passe complexes (majuscules, minuscules, chiffres, caractères spéciaux)',
        valueType: 'boolean',
        category: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'password_min_length',
        value: '8',
        description: 'Longueur minimale des mots de passe',
        valueType: 'number',
        category: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'password_expiration_days',
        value: '90',
        description: 'Nombre de jours avant expiration du mot de passe (0 = jamais)',
        valueType: 'number',
        category: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'password_history_count',
        value: '5',
        description: 'Nombre de mots de passe précédents à mémoriser pour éviter la réutilisation',
        valueType: 'number',
        category: 'password',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'two_factor_auth',
        value: 'false',
        description: 'Activer l\'authentification à deux facteurs',
        valueType: 'boolean',
        category: 'authentication',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'failed_login_attempts',
        value: '5',
        description: 'Nombre de tentatives de connexion échouées avant blocage',
        valueType: 'number',
        category: 'authentication',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'account_lockout_duration',
        value: '30',
        description: 'Durée de blocage du compte après échec de connexion (minutes)',
        valueType: 'number',
        category: 'authentication',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'session_timeout',
        value: '60',
        description: 'Délai d\'inactivité avant déconnexion automatique (minutes)',
        valueType: 'number',
        category: 'session',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'session_max_duration',
        value: '480',
        description: 'Durée maximale d\'une session (minutes)',
        valueType: 'number',
        category: 'session',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'ip_restriction_enabled',
        value: 'false',
        description: 'Activer la restriction par adresse IP',
        valueType: 'boolean',
        category: 'access',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'allowed_ips',
        value: '[]',
        description: 'Liste des adresses IP autorisées (format JSON)',
        valueType: 'json',
        category: 'access',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        key: 'force_ssl',
        value: 'true',
        description: 'Forcer l\'utilisation de SSL/HTTPS',
        valueType: 'boolean',
        category: 'access',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SecuritySettings', null, {});
  }
};
