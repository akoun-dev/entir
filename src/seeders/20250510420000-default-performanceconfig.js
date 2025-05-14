'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PerformanceConfigs', [
      {
        cacheEnabled: true,
        cacheSize: 500,
        cacheTTL: 3600,
        defaultPageSize: 25,
        queryOptimization: true,
        responseCompression: true,
        loggingLevel: 'info',
        requestTimeout: 30,
        maxDbConnections: 10,
        advancedSettings: JSON.stringify({
          minifyAssets: true,
          useEtags: true,
          gzipCompression: true,
          staticCacheMaxAge: 86400,
          apiRateLimit: 100,
          apiRateLimitWindow: 60,
          dbPoolIdleTimeout: 10000,
          dbPoolAcquireTimeout: 60000,
          dbPoolMaxUsage: 10,
          dbSlowQueryThreshold: 1000,
          memoryWatchEnabled: true,
          memoryWatchThreshold: 80,
          cpuWatchEnabled: true,
          cpuWatchThreshold: 70
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PerformanceConfigs', null, {});
  }
};
