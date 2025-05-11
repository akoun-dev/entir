'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Modèle de rapport financier mensuel
    const financialReportTemplate = `
{
  "title": "Rapport financier mensuel",
  "sections": [
    {
      "title": "Résumé",
      "type": "summary",
      "content": "Ce rapport présente un aperçu des performances financières pour la période sélectionnée."
    },
    {
      "title": "Revenus",
      "type": "chart",
      "chartType": "bar",
      "dataSource": "revenue_by_month",
      "options": {
        "xAxis": "month",
        "yAxis": "amount",
        "colors": ["#4CAF50"]
      }
    },
    {
      "title": "Dépenses",
      "type": "chart",
      "chartType": "bar",
      "dataSource": "expenses_by_month",
      "options": {
        "xAxis": "month",
        "yAxis": "amount",
        "colors": ["#F44336"]
      }
    },
    {
      "title": "Bénéfice net",
      "type": "chart",
      "chartType": "line",
      "dataSource": "profit_by_month",
      "options": {
        "xAxis": "month",
        "yAxis": "amount",
        "colors": ["#2196F3"]
      }
    },
    {
      "title": "Détails des revenus",
      "type": "table",
      "dataSource": "revenue_details",
      "columns": [
        { "field": "category", "header": "Catégorie" },
        { "field": "amount", "header": "Montant", "format": "currency" },
        { "field": "percentage", "header": "% du total", "format": "percentage" }
      ]
    },
    {
      "title": "Détails des dépenses",
      "type": "table",
      "dataSource": "expense_details",
      "columns": [
        { "field": "category", "header": "Catégorie" },
        { "field": "amount", "header": "Montant", "format": "currency" },
        { "field": "percentage", "header": "% du total", "format": "percentage" }
      ]
    }
  ]
}
    `;

    // Modèle de rapport de statistiques des ventes
    const salesReportTemplate = `
{
  "title": "Statistiques des ventes",
  "sections": [
    {
      "title": "Résumé",
      "type": "summary",
      "content": "Ce rapport présente les statistiques de ventes pour la période sélectionnée."
    },
    {
      "title": "Ventes par produit",
      "type": "chart",
      "chartType": "pie",
      "dataSource": "sales_by_product",
      "options": {
        "valueField": "amount",
        "nameField": "product",
        "showLegend": true
      }
    },
    {
      "title": "Ventes par région",
      "type": "chart",
      "chartType": "map",
      "dataSource": "sales_by_region",
      "options": {
        "valueField": "amount",
        "regionField": "region",
        "colorScale": ["#E3F2FD", "#1565C0"]
      }
    },
    {
      "title": "Évolution des ventes",
      "type": "chart",
      "chartType": "line",
      "dataSource": "sales_over_time",
      "options": {
        "xAxis": "date",
        "yAxis": "amount",
        "colors": ["#4CAF50"]
      }
    },
    {
      "title": "Top 10 des clients",
      "type": "table",
      "dataSource": "top_customers",
      "columns": [
        { "field": "customer", "header": "Client" },
        { "field": "orders", "header": "Commandes", "format": "number" },
        { "field": "amount", "header": "Montant total", "format": "currency" }
      ]
    },
    {
      "title": "Performance des vendeurs",
      "type": "table",
      "dataSource": "sales_by_employee",
      "columns": [
        { "field": "employee", "header": "Vendeur" },
        { "field": "sales", "header": "Ventes", "format": "number" },
        { "field": "amount", "header": "Montant total", "format": "currency" },
        { "field": "commission", "header": "Commission", "format": "currency" }
      ]
    }
  ]
}
    `;

    // Modèle de rapport d'activité des employés
    const employeeActivityReportTemplate = `
{
  "title": "Activité des employés",
  "sections": [
    {
      "title": "Résumé",
      "type": "summary",
      "content": "Ce rapport présente l'activité des employés pour la période sélectionnée."
    },
    {
      "title": "Heures travaillées par département",
      "type": "chart",
      "chartType": "bar",
      "dataSource": "hours_by_department",
      "options": {
        "xAxis": "department",
        "yAxis": "hours",
        "colors": ["#9C27B0"]
      }
    },
    {
      "title": "Taux de présence",
      "type": "chart",
      "chartType": "line",
      "dataSource": "attendance_rate",
      "options": {
        "xAxis": "date",
        "yAxis": "rate",
        "colors": ["#FF9800"]
      }
    },
    {
      "title": "Répartition des activités",
      "type": "chart",
      "chartType": "pie",
      "dataSource": "activity_distribution",
      "options": {
        "valueField": "hours",
        "nameField": "activity",
        "showLegend": true
      }
    },
    {
      "title": "Détails par employé",
      "type": "table",
      "dataSource": "employee_details",
      "columns": [
        { "field": "employee", "header": "Employé" },
        { "field": "department", "header": "Département" },
        { "field": "hours", "header": "Heures travaillées", "format": "number" },
        { "field": "tasks", "header": "Tâches complétées", "format": "number" },
        { "field": "efficiency", "header": "Efficacité", "format": "percentage" }
      ]
    },
    {
      "title": "Absences et congés",
      "type": "table",
      "dataSource": "absence_details",
      "columns": [
        { "field": "employee", "header": "Employé" },
        { "field": "type", "header": "Type d'absence" },
        { "field": "start_date", "header": "Date de début", "format": "date" },
        { "field": "end_date", "header": "Date de fin", "format": "date" },
        { "field": "days", "header": "Jours", "format": "number" }
      ]
    }
  ]
}
    `;

    await queryInterface.bulkInsert('ReportTemplates', [
      {
        name: 'Rapport financier mensuel',
        category: 'Finance',
        description: 'Rapport détaillé des performances financières mensuelles incluant revenus, dépenses et bénéfices',
        content: financialReportTemplate,
        format: 'PDF',
        parameters: JSON.stringify({
          date_range: { type: 'daterange', required: true },
          include_tax: { type: 'boolean', default: true },
          currency: { type: 'select', options: ['EUR', 'USD', 'GBP'], default: 'EUR' }
        }),
        query: 'SELECT * FROM financial_data WHERE date BETWEEN :start_date AND :end_date',
        previewUrl: '/assets/previews/financial-report.png',
        status: 'active',
        isShared: true,
        requiredPermissions: JSON.stringify(['finance.view']),
        scheduleFrequency: 'monthly',
        scheduleCron: '0 0 1 * *',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Statistiques des ventes',
        category: 'Ventes',
        description: 'Analyse détaillée des ventes par produit, région et période',
        content: salesReportTemplate,
        format: 'Excel',
        parameters: JSON.stringify({
          date_range: { type: 'daterange', required: true },
          product_category: { type: 'select', options: ['Tous', 'Électronique', 'Vêtements', 'Alimentation'], default: 'Tous' },
          region: { type: 'select', options: ['Toutes', 'Europe', 'Amérique', 'Asie'], default: 'Toutes' }
        }),
        query: 'SELECT * FROM sales_data WHERE date BETWEEN :start_date AND :end_date',
        previewUrl: '/assets/previews/sales-report.png',
        status: 'active',
        isShared: true,
        requiredPermissions: JSON.stringify(['sales.view']),
        scheduleFrequency: 'weekly',
        scheduleCron: '0 0 * * 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Activité des employés',
        category: 'RH',
        description: 'Suivi de l\'activité des employés, des heures travaillées et de l\'efficacité',
        content: employeeActivityReportTemplate,
        format: 'PDF',
        parameters: JSON.stringify({
          date_range: { type: 'daterange', required: true },
          department: { type: 'select', options: ['Tous', 'Ventes', 'Marketing', 'IT', 'RH'], default: 'Tous' },
          include_inactive: { type: 'boolean', default: false }
        }),
        query: 'SELECT * FROM employee_activity WHERE date BETWEEN :start_date AND :end_date',
        previewUrl: '/assets/previews/employee-activity-report.png',
        status: 'active',
        isShared: true,
        requiredPermissions: JSON.stringify(['hr.view']),
        scheduleFrequency: 'monthly',
        scheduleCron: '0 0 1 * *',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReportTemplates', null, {});
  }
};
