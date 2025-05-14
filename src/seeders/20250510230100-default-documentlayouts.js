'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Modèle de facture par défaut
    const invoiceTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Facture</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
    .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .logo { max-width: 200px; }
    .company-info { text-align: right; }
    .invoice-title { font-size: 24px; font-weight: bold; margin: 20px 0; color: #2c3e50; }
    .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .client-info { width: 50%; }
    .invoice-info { width: 40%; text-align: right; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background-color: #f8f9fa; text-align: left; padding: 10px; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    .total-section { margin-top: 30px; text-align: right; }
    .total { font-size: 18px; font-weight: bold; }
    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #777; }
  </style>
</head>
<body>
  <div class="header">
    <img src="{{company_logo}}" alt="Logo" class="logo">
    <div class="company-info">
      <h2>{{company_name}}</h2>
      <p>{{company_address}}</p>
      <p>{{company_phone}}</p>
      <p>{{company_email}}</p>
    </div>
  </div>
  
  <div class="invoice-title">FACTURE</div>
  
  <div class="invoice-details">
    <div class="client-info">
      <h3>Facturé à:</h3>
      <p>{{client_name}}</p>
      <p>{{client_address}}</p>
      <p>{{client_email}}</p>
    </div>
    <div class="invoice-info">
      <p><strong>Facture N°:</strong> {{invoice_number}}</p>
      <p><strong>Date:</strong> {{invoice_date}}</p>
      <p><strong>Échéance:</strong> {{due_date}}</p>
    </div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Quantité</th>
        <th>Prix unitaire</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {{#each items}}
      <tr>
        <td>{{description}}</td>
        <td>{{quantity}}</td>
        <td>{{unit_price}}</td>
        <td>{{total}}</td>
      </tr>
      {{/each}}
    </tbody>
  </table>
  
  <div class="total-section">
    <p><strong>Sous-total:</strong> {{subtotal}}</p>
    <p><strong>TVA ({{tax_rate}}%):</strong> {{tax_amount}}</p>
    <p class="total"><strong>Total:</strong> {{total_amount}}</p>
  </div>
  
  <div class="footer">
    <p>{{payment_instructions}}</p>
    <p>{{company_legal_info}}</p>
  </div>
</body>
</html>
    `;

    // Modèle de devis par défaut
    const quoteTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Devis</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
    .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .logo { max-width: 200px; }
    .company-info { text-align: right; }
    .quote-title { font-size: 24px; font-weight: bold; margin: 20px 0; color: #2c3e50; }
    .quote-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .client-info { width: 50%; }
    .quote-info { width: 40%; text-align: right; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background-color: #f8f9fa; text-align: left; padding: 10px; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    .total-section { margin-top: 30px; text-align: right; }
    .total { font-size: 18px; font-weight: bold; }
    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #777; }
    .validity { margin-top: 30px; padding: 10px; border: 1px solid #ddd; background-color: #f8f9fa; }
  </style>
</head>
<body>
  <div class="header">
    <img src="{{company_logo}}" alt="Logo" class="logo">
    <div class="company-info">
      <h2>{{company_name}}</h2>
      <p>{{company_address}}</p>
      <p>{{company_phone}}</p>
      <p>{{company_email}}</p>
    </div>
  </div>
  
  <div class="quote-title">DEVIS</div>
  
  <div class="quote-details">
    <div class="client-info">
      <h3>Client:</h3>
      <p>{{client_name}}</p>
      <p>{{client_address}}</p>
      <p>{{client_email}}</p>
    </div>
    <div class="quote-info">
      <p><strong>Devis N°:</strong> {{quote_number}}</p>
      <p><strong>Date:</strong> {{quote_date}}</p>
      <p><strong>Validité:</strong> {{validity_period}}</p>
    </div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Quantité</th>
        <th>Prix unitaire</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {{#each items}}
      <tr>
        <td>{{description}}</td>
        <td>{{quantity}}</td>
        <td>{{unit_price}}</td>
        <td>{{total}}</td>
      </tr>
      {{/each}}
    </tbody>
  </table>
  
  <div class="total-section">
    <p><strong>Sous-total:</strong> {{subtotal}}</p>
    <p><strong>TVA ({{tax_rate}}%):</strong> {{tax_amount}}</p>
    <p class="total"><strong>Total:</strong> {{total_amount}}</p>
  </div>
  
  <div class="validity">
    <p><strong>Conditions de validité:</strong></p>
    <p>Ce devis est valable pour une période de {{validity_period}} à compter de la date d'émission.</p>
    <p>Pour accepter ce devis, veuillez le signer et nous le retourner.</p>
  </div>
  
  <div class="footer">
    <p>{{company_legal_info}}</p>
  </div>
</body>
</html>
    `;

    // Modèle de bon de commande par défaut
    const orderTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Bon de commande</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; }
    .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .logo { max-width: 200px; }
    .company-info { text-align: right; }
    .order-title { font-size: 24px; font-weight: bold; margin: 20px 0; color: #2c3e50; }
    .order-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
    .supplier-info { width: 50%; }
    .order-info { width: 40%; text-align: right; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background-color: #f8f9fa; text-align: left; padding: 10px; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    .total-section { margin-top: 30px; text-align: right; }
    .total { font-size: 18px; font-weight: bold; }
    .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #777; }
    .shipping-info { margin-top: 30px; padding: 10px; border: 1px solid #ddd; background-color: #f8f9fa; }
  </style>
</head>
<body>
  <div class="header">
    <img src="{{company_logo}}" alt="Logo" class="logo">
    <div class="company-info">
      <h2>{{company_name}}</h2>
      <p>{{company_address}}</p>
      <p>{{company_phone}}</p>
      <p>{{company_email}}</p>
    </div>
  </div>
  
  <div class="order-title">BON DE COMMANDE</div>
  
  <div class="order-details">
    <div class="supplier-info">
      <h3>Fournisseur:</h3>
      <p>{{supplier_name}}</p>
      <p>{{supplier_address}}</p>
      <p>{{supplier_email}}</p>
    </div>
    <div class="order-info">
      <p><strong>Commande N°:</strong> {{order_number}}</p>
      <p><strong>Date:</strong> {{order_date}}</p>
      <p><strong>Référence:</strong> {{reference}}</p>
    </div>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Référence</th>
        <th>Quantité</th>
        <th>Prix unitaire</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {{#each items}}
      <tr>
        <td>{{description}}</td>
        <td>{{reference}}</td>
        <td>{{quantity}}</td>
        <td>{{unit_price}}</td>
        <td>{{total}}</td>
      </tr>
      {{/each}}
    </tbody>
  </table>
  
  <div class="total-section">
    <p><strong>Sous-total:</strong> {{subtotal}}</p>
    <p><strong>TVA ({{tax_rate}}%):</strong> {{tax_amount}}</p>
    <p class="total"><strong>Total:</strong> {{total_amount}}</p>
  </div>
  
  <div class="shipping-info">
    <p><strong>Informations de livraison:</strong></p>
    <p><strong>Adresse:</strong> {{shipping_address}}</p>
    <p><strong>Date de livraison souhaitée:</strong> {{desired_delivery_date}}</p>
    <p><strong>Instructions spéciales:</strong> {{special_instructions}}</p>
  </div>
  
  <div class="footer">
    <p>{{company_legal_info}}</p>
  </div>
</body>
</html>
    `;

    await queryInterface.bulkInsert('DocumentLayouts', [
      {
        name: 'Facture standard',
        type: 'Facture',
        content: invoiceTemplate,
        metadata: JSON.stringify({
          version: '1.0',
          author: 'System',
          tags: ['standard', 'facture', 'default']
        }),
        isDefault: true,
        orientation: 'portrait',
        paperSize: 'A4',
        margins: JSON.stringify({ top: 10, right: 10, bottom: 10, left: 10 }),
        previewUrl: '/assets/previews/invoice-standard.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Devis professionnel',
        type: 'Devis',
        content: quoteTemplate,
        metadata: JSON.stringify({
          version: '1.0',
          author: 'System',
          tags: ['standard', 'devis', 'default']
        }),
        isDefault: true,
        orientation: 'portrait',
        paperSize: 'A4',
        margins: JSON.stringify({ top: 10, right: 10, bottom: 10, left: 10 }),
        previewUrl: '/assets/previews/quote-professional.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bon de commande',
        type: 'Commande',
        content: orderTemplate,
        metadata: JSON.stringify({
          version: '1.0',
          author: 'System',
          tags: ['standard', 'commande', 'default']
        }),
        isDefault: true,
        orientation: 'portrait',
        paperSize: 'A4',
        margins: JSON.stringify({ top: 10, right: 10, bottom: 10, left: 10 }),
        previewUrl: '/assets/previews/order-standard.png',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DocumentLayouts', null, {});
  }
};
