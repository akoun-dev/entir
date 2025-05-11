'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ThemeConfigs', [
      {
        mode: 'light',
        primaryColor: '#3b82f6',
        secondaryColor: '#10b981',
        density: 'normal',
        fontSize: 'medium',
        highContrast: false,
        reducedMotion: false,
        dashboardLayout: 'default',
        customCSS: null,
        advancedSettings: JSON.stringify({
          borderRadius: 'medium',
          animationSpeed: 'normal',
          fontFamily: 'Inter, sans-serif',
          menuStyle: 'standard',
          tableStyle: 'bordered',
          buttonStyle: 'rounded'
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ThemeConfigs', null, {});
  }
};
