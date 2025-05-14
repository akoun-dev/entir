'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('SequenceConfigs', [
      {
        fiscalYearStart: '01-01',
        fiscalYearEnd: '12-31',
        defaultFormat: 'prefix-number-year',
        defaultPadding: 5,
        autoReset: true,
        advancedSettings: JSON.stringify({
          yearFormat: 'YY',
          separator: '-',
          allowCustomFormat: true,
          allowManualReset: true,
          allowManualNumbering: false,
          enforceUniqueness: true,
          lockSequenceAfterUse: true
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SequenceConfigs', null, {});
  }
};
