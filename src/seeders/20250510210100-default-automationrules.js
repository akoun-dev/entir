'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AutomationRules', [
      {
        name: 'Sauvegarde quotidienne',
        description: 'Effectue une sauvegarde complète de la base de données tous les jours à 2h du matin',
        trigger_type: 'cron',
        trigger_value: '0 2 * * *', // Tous les jours à 02:00
        action_type: 'database_backup',
        action_params: JSON.stringify({
          type: 'full',
          destination: 'local',
          retention_days: 7
        }),
        enabled: true,
        priority: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nettoyage des logs',
        description: 'Supprime les logs de plus de 30 jours tous les lundis à 3h du matin',
        trigger_type: 'cron',
        trigger_value: '0 3 * * 1', // Tous les lundis à 03:00
        action_type: 'cleanup_logs',
        action_params: JSON.stringify({
          older_than_days: 30,
          log_types: ['system', 'access', 'error']
        }),
        enabled: true,
        priority: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Notification de fin de mois',
        description: 'Envoie un rapport mensuel aux administrateurs le dernier jour du mois',
        trigger_type: 'cron',
        trigger_value: '0 18 L * *', // Dernier jour du mois à 18:00
        action_type: 'send_report',
        action_params: JSON.stringify({
          report_type: 'monthly_summary',
          recipients: ['admin@example.com'],
          format: 'pdf'
        }),
        enabled: false,
        priority: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mise à jour des taux de change',
        description: 'Met à jour les taux de change des devises tous les jours à 1h du matin',
        trigger_type: 'cron',
        trigger_value: '0 1 * * *', // Tous les jours à 01:00
        action_type: 'update_exchange_rates',
        action_params: JSON.stringify({
          source: 'api',
          base_currency: 'EUR'
        }),
        enabled: true,
        priority: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AutomationRules', null, {});
  }
};
