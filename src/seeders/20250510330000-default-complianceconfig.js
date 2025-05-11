'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ComplianceConfigs', [
      {
        gdprEnabled: true,
        dataRetentionPeriod: 730, // 2 ans
        anonymizeAfterRetention: true,
        requireConsent: true,
        consentText: `En utilisant notre application, vous acceptez notre politique de confidentialité et notre utilisation de vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
        
Nous collectons et traitons vos données uniquement dans le but de vous fournir nos services et d'améliorer votre expérience utilisateur. Vous pouvez à tout moment exercer vos droits d'accès, de rectification, d'effacement et de portabilité de vos données.`,
        privacyPolicyUrl: 'https://example.com/privacy-policy',
        logSensitiveDataAccess: true,
        encryptSensitiveData: true,
        dataBreachNotification: true,
        dataBreachEmails: JSON.stringify(['admin@example.com', 'security@example.com', 'dpo@example.com']),
        hipaaCompliance: false,
        pciDssCompliance: false,
        soxCompliance: false,
        advancedSettings: JSON.stringify({
          cookieConsentRequired: true,
          cookieLifetime: 30, // jours
          thirdPartyDataSharing: false,
          dataSubjectRequestsEmail: 'privacy@example.com',
          dpoContactInfo: {
            name: 'John Doe',
            email: 'dpo@example.com',
            phone: '+33123456789'
          },
          automaticDeletion: true,
          dataBackupRetention: 90 // jours
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ComplianceConfigs', null, {});
  }
};
