'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Fonction pour hacher les mots de passe
    const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    };

    // Vérifier si des utilisateurs existent déjà
    const existingUsers = await queryInterface.sequelize.query(
      'SELECT username FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const existingUsernames = existingUsers.map(user => user.username);

    // Utilisateurs par défaut
    const defaultUsers = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: await hashPassword('admin123'), // En production, utilisez un mot de passe plus sécurisé
        firstName: 'Admin',
        lastName: 'Système',
        role: 'admin',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'manager',
        email: 'manager@example.com',
        password: await hashPassword('manager123'),
        firstName: 'Jean',
        lastName: 'Dupont',
        role: 'manager',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'user',
        email: 'user@example.com',
        password: await hashPassword('user123'),
        firstName: 'Marie',
        lastName: 'Martin',
        role: 'user',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Filtrer les utilisateurs qui n'existent pas encore
    const usersToInsert = defaultUsers.filter(user => !existingUsernames.includes(user.username));

    // Insérer les nouveaux utilisateurs s'il y en a
    if (usersToInsert.length > 0) {
      await queryInterface.bulkInsert('Users', usersToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
