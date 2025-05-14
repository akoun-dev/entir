'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Printers', [
      {
        name: 'Imprimante principale',
        type: 'Laser',
        connection: 'Réseau',
        address: '192.168.1.100',
        port: 9100,
        driver: 'HP LaserJet Pro',
        options: JSON.stringify({
          paper_size: 'A4',
          color_mode: 'color',
          dpi: 600,
          tray: 'auto'
        }),
        isDefault: true,
        status: 'active',
        capabilities: JSON.stringify({
          duplex: true,
          color: true,
          staple: false,
          scan: true,
          fax: false,
          paper_sizes: ['A4', 'A5', 'Letter', 'Legal']
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Imprimante étiquettes',
        type: 'Thermique',
        connection: 'USB',
        address: 'USB001',
        port: null,
        driver: 'DYMO LabelWriter',
        options: JSON.stringify({
          paper_size: 'Label',
          color_mode: 'monochrome',
          dpi: 300,
          label_width: 89,
          label_height: 36
        }),
        isDefault: false,
        status: 'active',
        capabilities: JSON.stringify({
          duplex: false,
          color: false,
          staple: false,
          scan: false,
          fax: false,
          paper_sizes: ['Label-Small', 'Label-Medium', 'Label-Large']
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Imprimante factures',
        type: 'Laser',
        connection: 'Réseau',
        address: '192.168.1.101',
        port: 9100,
        driver: 'Brother HL-L8360CDW',
        options: JSON.stringify({
          paper_size: 'A4',
          color_mode: 'monochrome',
          dpi: 1200,
          tray: 'tray1'
        }),
        isDefault: false,
        status: 'active',
        capabilities: JSON.stringify({
          duplex: true,
          color: true,
          staple: false,
          scan: false,
          fax: false,
          paper_sizes: ['A4', 'A5', 'Letter', 'Legal']
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Printers', null, {});
  }
};
