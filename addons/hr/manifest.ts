import { AddonManifest } from '../../src/types/addon';
import {
  HrDashboardView,
  EmployeesView,
  DepartmentsView,
  DocumentsView,
  SettingsView
} from './views/pages';
const manifest: AddonManifest = {
  // Métadonnées de base
  name: 'hr',
  version: '1.0.0',
  displayName: 'Ressources Humaines',
  summary: 'Gestion des ressources humaines',
  description: 'Module de gestion des ressources humaines pour la gestion des employés, départements, congés et feuilles de temps',

  // Configuration
  application: true,
  autoInstall: false,
  installable: true,

  // Routes définies par l'addon
  routes: [
    {
      path: '/hr',
      component: HrDashboardView,
      protected: true,
      title: 'Tableau de bord RH',
      icon: 'LayoutDashboardIcon'
    },
    {
      path: '/hr/employees',
      component: EmployeesView,
      protected: true,
      title: 'Employés',
      icon: 'UsersIcon'
    },
    {
      path: '/hr/departments',
      component: DepartmentsView,
      protected: true,
      title: 'Départements',
      icon: 'FolderIcon'
    },
    {
      path: '/hr/documents',
      component: DocumentsView,
      protected: true,
      title: 'Documents',
      icon: 'FileTextIcon'
    },
    {
      path: '/hr/settings',
      component: SettingsView,
      protected: true,
      title: 'Configurations',
      icon: 'SettingsIcon'
    }
  ],

  // Modèles de données
  models: [
    {
      name: 'hr.employee',
      displayName: 'Employé',
      fields: [
        { name: 'name', type: 'string', required: true, label: 'Nom' },
        { name: 'job_title', type: 'string', required: false, label: 'Poste' },
        { name: 'department_id', type: 'many2one', required: false, label: 'Département', relation: 'hr.department' },
        { name: 'work_email', type: 'string', required: false, label: 'Email professionnel' },
        { name: 'work_phone', type: 'string', required: false, label: 'Téléphone professionnel' },
        { name: 'parent_id', type: 'many2one', required: false, label: 'Responsable', relation: 'hr.employee' }
      ]
    },
    {
      name: 'hr.department',
      displayName: 'Département',
      fields: [
        { name: 'name', type: 'string', required: true, label: 'Nom' },
        { name: 'manager_id', type: 'many2one', required: false, label: 'Responsable', relation: 'hr.employee' }
      ]
    },
    {
      name: 'hr.leave',
      displayName: 'Congé',
      fields: [
        { name: 'employee_id', type: 'many2one', required: true, label: 'Employé', relation: 'hr.employee' },
        { name: 'date_from', type: 'date', required: true, label: 'Date de début' },
        { name: 'date_to', type: 'date', required: true, label: 'Date de fin' },
        { name: 'state', type: 'string', required: true, label: 'État', default: 'draft' },
        { name: 'type', type: 'string', required: true, label: 'Type de congé' }
      ]
    }
  ],

  // Menus définis par l'addon
  menus: [
    {
      id: 'menu_hr_root',
      name: 'Ressources Humaines',
      sequence: 10,
      route: '/hr',
      icon: 'UserIcon'
    }
  ],

  // Dépendances
  dependencies: []
};

export default manifest;
