import { AddonManifest } from '../../src/types/addon';
import {
  FinanceDashboardView,
  InvoicesView,
  PaymentsView,
  ReportsView
} from './views/pages';

const manifest: AddonManifest = {
  // Métadonnées de base
  name: 'finance',
  version: '1.0.0',
  displayName: 'Finance',
  summary: 'Gestion financière',
  description: 'Module de gestion financière pour la comptabilité, facturation, paiements et rapports financiers',

  // Configuration
  application: true,
  autoInstall: false,
  installable: true,

  // Routes définies par l'addon
  routes: [
    {
      path: '/finance',
      component: FinanceDashboardView,
      protected: true,
      title: 'Tableau de bord Finance',
      icon: 'BarChart'
    },
    {
      path: '/finance/invoices',
      component: InvoicesView,
      protected: true,
      title: 'Factures',
      icon: 'Receipt'
    },
    {
      path: '/finance/payments',
      component: PaymentsView,
      protected: true,
      title: 'Paiements',
      icon: 'CreditCard'
    },
    {
      path: '/finance/reports',
      component: ReportsView,
      protected: true,
      title: 'Rapports',
      icon: 'FileBarChart'
    }
  ],

  // Modèles de données
  models: [
    {
      name: 'finance.invoice',
      displayName: 'Facture',
      fields: [
        { name: 'number', type: 'string', required: true, label: 'Numéro' },
        { name: 'date', type: 'date', required: true, label: 'Date' },
        { name: 'partner_id', type: 'many2one', required: true, label: 'Client', relation: 'res.partner' },
        { name: 'amount_total', type: 'number', required: true, label: 'Montant total' },
        { name: 'state', type: 'string', required: true, label: 'État', default: 'draft' }
      ]
    },
    {
      name: 'finance.payment',
      displayName: 'Paiement',
      fields: [
        { name: 'date', type: 'date', required: true, label: 'Date' },
        { name: 'amount', type: 'number', required: true, label: 'Montant' },
        { name: 'partner_id', type: 'many2one', required: true, label: 'Client/Fournisseur', relation: 'res.partner' },
        { name: 'type', type: 'string', required: true, label: 'Type', default: 'inbound' }
      ]
    }
  ],

  // Menus définis par l'addon
  menus: [
    {
      id: 'menu_finance_root',
      name: 'Finance',
      sequence: 20,
      route: '/finance',
      icon: 'BarChart'
    },
    {
      id: 'menu_finance_invoices',
      name: 'Factures',
      sequence: 10,
      route: '/finance/invoices',
      parent: 'menu_finance_root',
      icon: 'Receipt'
    },
    {
      id: 'menu_finance_payments',
      name: 'Paiements',
      sequence: 20,
      route: '/finance/payments',
      parent: 'menu_finance_root',
      icon: 'CreditCard'
    },
    {
      id: 'menu_finance_reports',
      name: 'Rapports',
      sequence: 30,
      route: '/finance/reports',
      parent: 'menu_finance_root',
      icon: 'FileBarChart'
    }
  ],

  // Dépendances
  dependencies: []
};

export default manifest;
