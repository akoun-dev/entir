'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('CalendarConfigs', [
      {
        timezone: 'Europe/Paris',
        workHoursStart: '08:00',
        workHoursEnd: '18:00',
        weekStart: 'monday',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        workDays: JSON.stringify(['monday', 'tuesday', 'wednesday', 'thursday', 'friday']),
        advancedSettings: JSON.stringify({
          showWeekNumbers: true,
          firstDayOfYear: 1,
          minimalDaysInFirstWeek: 4,
          workWeekStart: 1,
          workWeekEnd: 5,
          defaultView: 'month',
          defaultDuration: 60,
          slotDuration: 30,
          snapDuration: 15
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CalendarConfigs', null, {});
  }
};
