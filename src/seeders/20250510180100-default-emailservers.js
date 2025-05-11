'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vérifier si des serveurs d'email existent déjà
    const existingEmailServers = await queryInterface.sequelize.query(
      'SELECT name FROM EmailServers;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    ).catch(() => []);
    
    // Créer un ensemble de noms existants pour une recherche plus rapide
    const existingNames = new Set(existingEmailServers.map(server => server.name));
    
    // Serveurs d'email par défaut
    const defaultEmailServers = [
      {
        name: 'Serveur SMTP principal',
        protocol: 'smtp',
        host: 'smtp.example.com',
        port: 587,
        username: 'user@example.com',
        password: 'password123', // Dans un environnement de production, utiliser un mot de passe sécurisé
        encryption: 'tls',
        from_email: 'noreply@example.com',
        from_name: 'ERP System',
        is_default: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Serveur SMTP secondaire',
        protocol: 'smtp',
        host: 'smtp2.example.com',
        port: 465,
        username: 'user2@example.com',
        password: 'password456', // Dans un environnement de production, utiliser un mot de passe sécurisé
        encryption: 'ssl',
        from_email: 'support@example.com',
        from_name: 'ERP Support',
        is_default: false,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    // Filtrer les serveurs qui n'existent pas encore
    const serversToInsert = defaultEmailServers.filter(server => !existingNames.has(server.name));
    
    // Insérer les nouveaux serveurs s'il y en a
    if (serversToInsert.length > 0) {
      await queryInterface.bulkInsert('EmailServers', serversToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('EmailServers', null, {});
  }
};
