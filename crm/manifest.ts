import { AddonManifest } from '../../src/types/addon';

const manifest: AddonManifest = {
  // Métadonnées de base
  name: 'crm',
  version: '1.0.0',
  displayName: 'CRM',
  summary: 'Gestion de la relation client',
  description: 'Module de gestion des clients, opportunités, leads et ventes',

  // Configuration
  application: true,
  autoInstall: false,
  installable: true,

  // Routes définies par l'addon
  routes: [],

  // Modèles de données
  models: [
    {
      name: 'crm.lead',
      displayName: 'Lead',
      fields: [
        { name: 'name', type: 'string', required: true, label: 'Nom' },
        { name: 'email', type: 'string', required: false, label: 'Email' },
        { name: 'phone', type: 'string', required: false, label: 'Téléphone' },
        { name: 'company', type: 'string', required: false, label: 'Société' },
        { name: 'status', type: 'string', required: true, label: 'Statut', default: 'new' }
      ]
    },
    {
      name: 'crm.opportunity',
      displayName: 'Opportunité',
      fields: [
        { name: 'name', type: 'string', required: true, label: 'Nom' },
        { name: 'customer_id', type: 'many2one', required: true, label: 'Client', relation: 'crm.customer' },
        { name: 'expected_revenue', type: 'number', required: false, label: 'Revenu attendu' },
        { name: 'probability', type: 'number', required: false, label: 'Probabilité (%)' },
        { name: 'stage_id', type: 'many2one', required: true, label: 'Étape', relation: 'crm.stage' }
      ]
    },
    {
      name: 'crm.customer',
      displayName: 'Client',
      fields: [
        { name: 'name', type: 'string', required: true, label: 'Nom' },
        { name: 'email', type: 'string', required: false, label: 'Email' },
        { name: 'phone', type: 'string', required: false, label: 'Téléphone' },
        { name: 'address', type: 'string', required: false, label: 'Adresse' },
        { name: 'type', type: 'string', required: true, label: 'Type', default: 'company' }
      ]
    }
  ],

  // Menus définis par l'addon
  menus: [
    {
      id: 'menu_crm_root',
      name: 'CRM',
      sequence: 15,
      route: '/crm',
      icon: 'Users'
    },
    {
      id: 'menu_crm_dashboard',
      name: 'Tableau de bord',
      sequence: 10,
      route: '/crm',
      parent: 'menu_crm_root',
      icon: 'LayoutDashboard'
    },
    {
      id: 'menu_crm_leads',
      name: 'Leads',
      sequence: 20,
      route: '/crm/leads',
      parent: 'menu_crm_root',
      icon: 'UserPlus'
    },
    {
      id: 'menu_crm_opportunities',
      name: 'Opportunités',
      sequence: 30,
      route: '/crm/opportunities',
      parent: 'menu_crm_root',
      icon: 'Target'
    },
    {
      id: 'menu_crm_customers',
      name: 'Clients',
      sequence: 40,
      route: '/crm/customers',
      parent: 'menu_crm_root',
      icon: 'Building'
    },
    {
      id: 'menu_crm_activities',
      name: 'Activités',
      sequence: 50,
      route: '/crm/activities',
      parent: 'menu_crm_root',
      icon: 'Calendar'
    }
  ],

  // Dépendances
  dependencies: []
};

export default manifest;
