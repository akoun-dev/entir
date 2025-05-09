import { AddonManifest } from '../../src/types/addon';

const manifest: AddonManifest = {
  // Métadonnées de base
  name: 'project',
  version: '1.0.0',
  displayName: 'Projets',
  summary: 'Gestion de projets',
  description: 'Module de gestion de projets, tâches, planification et suivi de temps',

  // Configuration
  application: true,
  autoInstall: false,
  installable: true,

  // Routes définies par l'addon
  routes: [],

  // Modèles de données
  models: [
    {
      name: 'project.project',
      displayName: 'Projet',
      fields: [
        { name: 'name', type: 'string', required: true, label: 'Nom' },
        { name: 'description', type: 'string', required: false, label: 'Description' },
        { name: 'customer_id', type: 'many2one', required: false, label: 'Client', relation: 'crm.customer' },
        { name: 'start_date', type: 'date', required: false, label: 'Date de début' },
        { name: 'end_date', type: 'date', required: false, label: 'Date de fin' },
        { name: 'status', type: 'string', required: true, label: 'Statut', default: 'draft' }
      ]
    },
    {
      name: 'project.task',
      displayName: 'Tâche',
      fields: [
        { name: 'name', type: 'string', required: true, label: 'Nom' },
        { name: 'description', type: 'string', required: false, label: 'Description' },
        { name: 'project_id', type: 'many2one', required: true, label: 'Projet', relation: 'project.project' },
        { name: 'user_id', type: 'many2one', required: false, label: 'Assigné à', relation: 'hr.employee' },
        { name: 'planned_hours', type: 'number', required: false, label: 'Heures planifiées' },
        { name: 'spent_hours', type: 'number', required: false, label: 'Heures passées' },
        { name: 'deadline', type: 'date', required: false, label: 'Échéance' },
        { name: 'priority', type: 'string', required: true, label: 'Priorité', default: 'normal' },
        { name: 'status', type: 'string', required: true, label: 'Statut', default: 'todo' }
      ]
    },
    {
      name: 'project.timesheet',
      displayName: 'Feuille de temps',
      fields: [
        { name: 'date', type: 'date', required: true, label: 'Date' },
        { name: 'task_id', type: 'many2one', required: true, label: 'Tâche', relation: 'project.task' },
        { name: 'user_id', type: 'many2one', required: true, label: 'Utilisateur', relation: 'hr.employee' },
        { name: 'hours', type: 'number', required: true, label: 'Heures' },
        { name: 'description', type: 'string', required: false, label: 'Description' }
      ]
    }
  ],

  // Menus définis par l'addon
  menus: [
    {
      id: 'menu_project_root',
      name: 'Projets',
      sequence: 25,
      route: '/project',
      icon: 'Briefcase'
    },
    {
      id: 'menu_project_dashboard',
      name: 'Tableau de bord',
      sequence: 10,
      route: '/project',
      parent: 'menu_project_root',
      icon: 'LayoutDashboard'
    },
    {
      id: 'menu_project_projects',
      name: 'Projets',
      sequence: 20,
      route: '/project/projects',
      parent: 'menu_project_root',
      icon: 'FolderKanban'
    },
    {
      id: 'menu_project_tasks',
      name: 'Tâches',
      sequence: 30,
      route: '/project/tasks',
      parent: 'menu_project_root',
      icon: 'CheckSquare'
    },
    {
      id: 'menu_project_timesheets',
      name: 'Feuilles de temps',
      sequence: 40,
      route: '/project/timesheets',
      parent: 'menu_project_root',
      icon: 'Clock'
    },
    {
      id: 'menu_project_planning',
      name: 'Planning',
      sequence: 50,
      route: '/project/planning',
      parent: 'menu_project_root',
      icon: 'Calendar'
    },
    {
      id: 'menu_project_reports',
      name: 'Rapports',
      sequence: 60,
      route: '/project/reports',
      parent: 'menu_project_root',
      icon: 'BarChart'
    }
  ],

  // Dépendances
  dependencies: ['hr']
};

export default manifest;
