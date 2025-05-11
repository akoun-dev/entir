'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Récupérer les IDs des utilisateurs
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users LIMIT 5',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    if (users.length === 0) {
      console.log('Aucun utilisateur trouvé, impossible de créer des enregistrements de consentement');
      return;
    }
    
    // Créer des exemples d'enregistrements de consentement
    const now = new Date();
    
    // Dates pour les consentements
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const lastMonth = new Date(now);
    lastMonth.setDate(lastMonth.getDate() - 30);
    
    // Date d'expiration (1 an après le consentement)
    const expiryYesterday = new Date(yesterday);
    expiryYesterday.setFullYear(expiryYesterday.getFullYear() + 1);
    
    const expiryLastWeek = new Date(lastWeek);
    expiryLastWeek.setFullYear(expiryLastWeek.getFullYear() + 1);
    
    const expiryLastMonth = new Date(lastMonth);
    expiryLastMonth.setFullYear(expiryLastMonth.getFullYear() + 1);
    
    // Préparer les enregistrements de consentement
    const consentRecords = [];
    
    // Pour chaque utilisateur, créer différents types de consentement
    users.forEach((user, index) => {
      // Consentement à la politique de confidentialité
      consentRecords.push({
        userId: user.id,
        consentType: 'privacy_policy',
        consentDate: index === 0 ? yesterday : (index === 1 ? lastWeek : lastMonth),
        consentValue: true,
        policyVersion: '1.0',
        ipAddress: `192.168.1.${10 + index}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        collectionMethod: 'web_form',
        consentText: 'J\'accepte la politique de confidentialité et le traitement de mes données personnelles.',
        expiryDate: index === 0 ? expiryYesterday : (index === 1 ? expiryLastWeek : expiryLastMonth),
        metadata: JSON.stringify({
          formId: 'privacy-consent-form',
          pageUrl: '/signup'
        }),
        createdAt: index === 0 ? yesterday : (index === 1 ? lastWeek : lastMonth),
        updatedAt: index === 0 ? yesterday : (index === 1 ? lastWeek : lastMonth)
      });
      
      // Consentement aux cookies
      consentRecords.push({
        userId: user.id,
        consentType: 'cookies',
        consentDate: index === 0 ? yesterday : (index === 1 ? lastWeek : lastMonth),
        consentValue: index < 4, // Le dernier utilisateur refuse les cookies
        policyVersion: '1.0',
        ipAddress: `192.168.1.${10 + index}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        collectionMethod: 'cookie_banner',
        consentText: 'J\'accepte l\'utilisation de cookies pour améliorer mon expérience sur le site.',
        expiryDate: index === 0 ? expiryYesterday : (index === 1 ? expiryLastWeek : expiryLastMonth),
        metadata: JSON.stringify({
          bannerId: 'cookie-consent-banner',
          pageUrl: '/'
        }),
        createdAt: index === 0 ? yesterday : (index === 1 ? lastWeek : lastMonth),
        updatedAt: index === 0 ? yesterday : (index === 1 ? lastWeek : lastMonth)
      });
      
      // Consentement au marketing (seulement pour certains utilisateurs)
      if (index < 3) {
        consentRecords.push({
          userId: user.id,
          consentType: 'marketing',
          consentDate: index === 0 ? yesterday : (index === 1 ? lastWeek : lastMonth),
          consentValue: index < 2, // Le troisième utilisateur refuse le marketing
          policyVersion: '1.0',
          ipAddress: `192.168.1.${10 + index}`,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          collectionMethod: 'preference_center',
          consentText: 'J\'accepte de recevoir des communications marketing par email.',
          expiryDate: index === 0 ? expiryYesterday : (index === 1 ? expiryLastWeek : expiryLastMonth),
          metadata: JSON.stringify({
            formId: 'marketing-preferences',
            pageUrl: '/account/preferences'
          }),
          createdAt: index === 0 ? yesterday : (index === 1 ? lastWeek : lastMonth),
          updatedAt: index === 0 ? yesterday : (index === 1 ? lastWeek : lastMonth)
        });
      }
    });
    
    await queryInterface.bulkInsert('ConsentRecords', consentRecords, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ConsentRecords', null, {});
  }
};
