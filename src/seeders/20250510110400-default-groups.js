'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Vérifier si des groupes existent déjà
    const existingGroups = await queryInterface.sequelize.query(
      'SELECT name FROM Groups;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const existingGroupNames = existingGroups.map(group => group.name);

    // Groupes par défaut
    const defaultGroups = [
      {
        name: 'Administrateurs',
        description: 'Groupe avec tous les droits d\'administration',
        permissions: JSON.stringify(['all']),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gestionnaires',
        description: 'Groupe avec des droits de gestion limités',
        permissions: JSON.stringify(['read', 'write', 'update']),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Utilisateurs',
        description: 'Groupe avec des droits de base',
        permissions: JSON.stringify(['read']),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Comptabilité',
        description: 'Groupe pour le département comptabilité',
        permissions: JSON.stringify(['read', 'write', 'update:finance']),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ventes',
        description: 'Groupe pour le département des ventes',
        permissions: JSON.stringify(['read', 'write', 'update:sales']),
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Filtrer les groupes qui n'existent pas encore
    const groupsToInsert = defaultGroups.filter(group => !existingGroupNames.includes(group.name));

    // Insérer les nouveaux groupes s'il y en a
    if (groupsToInsert.length > 0) {
      await queryInterface.bulkInsert('Groups', groupsToInsert, {});
    }

    // Récupérer les IDs des utilisateurs et des groupes
    const users = await queryInterface.sequelize.query(
      'SELECT id, role FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const groups = await queryInterface.sequelize.query(
      'SELECT id, name FROM Groups;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Associer les utilisateurs aux groupes
    const userGroupsData = [];

    // Trouver les IDs
    const adminUser = users.find(u => u.role === 'admin');
    const managerUser = users.find(u => u.role === 'manager');
    const regularUser = users.find(u => u.role === 'user');

    const adminGroup = groups.find(g => g.name === 'Administrateurs');
    const managerGroup = groups.find(g => g.name === 'Gestionnaires');
    const userGroup = groups.find(g => g.name === 'Utilisateurs');
    const accountingGroup = groups.find(g => g.name === 'Comptabilité');
    const salesGroup = groups.find(g => g.name === 'Ventes');

    // Créer les associations
    if (adminUser && adminGroup) {
      userGroupsData.push({
        userId: adminUser.id,
        groupId: adminGroup.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    if (managerUser && managerGroup) {
      userGroupsData.push({
        userId: managerUser.id,
        groupId: managerGroup.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Ajouter le manager au groupe Ventes aussi
      if (salesGroup) {
        userGroupsData.push({
          userId: managerUser.id,
          groupId: salesGroup.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    if (regularUser && userGroup) {
      userGroupsData.push({
        userId: regularUser.id,
        groupId: userGroup.id,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Ajouter l'utilisateur au groupe Comptabilité
      if (accountingGroup) {
        userGroupsData.push({
          userId: regularUser.id,
          groupId: accountingGroup.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    // Vérifier si des associations existent déjà
    const existingUserGroups = await queryInterface.sequelize.query(
      'SELECT userId, groupId FROM UserGroups;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Filtrer les associations qui n'existent pas encore
    const userGroupsToInsert = userGroupsData.filter(ug =>
      !existingUserGroups.some(
        existing => existing.userId === ug.userId && existing.groupId === ug.groupId
      )
    );

    // Insérer les nouvelles associations s'il y en a
    if (userGroupsToInsert.length > 0) {
      await queryInterface.bulkInsert('UserGroups', userGroupsToInsert, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserGroups', null, {});
    await queryInterface.bulkDelete('Groups', null, {});
  }
};
