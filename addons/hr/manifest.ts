import { AddonManifest } from '../../src/types/addon';

/**
 * Manifeste du module RH (Ressources Humaines)
 * 
 * Ce module gère les fonctionnalités liées aux ressources humaines :
 * - Gestion des employés
 * - Gestion des départements
 * - Gestion des postes
 * - Gestion des contrats
 * - Gestion des congés
 * - Gestion des présences
 * - Gestion des évaluations
 */
const manifest: AddonManifest = {
  // Métadonnées de base
  name: 'hr',
  version: '1.0.0',
  displayName: 'Ressources Humaines',
  summary: 'Gestion complète des ressources humaines',
  description: 'Module de gestion des ressources humaines incluant la gestion des employés, départements, postes, contrats, congés, présences et évaluations.',
  
  // Configuration
  application: true,
  autoInstall: false,
  installable: true,
  
  // Dépendances
  dependencies: [''],
  
  // Modèles de données
  models: [
    'Employee',
    'Department',
    'Position',
    'Contract',
    'Leave',
    'Attendance',
    'Evaluation',
    'EmployeeDocument',
    'LeaveType',
    'AttendanceType',
    'EvaluationType',
    'EmployeeSkill',
    'Skill',
    'SkillLevel'
  ],
  
  // Menus définis par l'addon
  menus: [
    {
      id: 'hr',
      name: 'Ressources Humaines',
      sequence: 30,
      route: '/hr',
      icon: 'users',
      parent: null,
      children: [
        {
          id: 'hr-employees',
          name: 'Employés',
          sequence: 10,
          route: '/hr/employees',
          icon: 'user',
          parent: 'hr'
        },
        {
          id: 'hr-departments',
          name: 'Départements',
          sequence: 20,
          route: '/hr/departments',
          icon: 'building',
          parent: 'hr'
        },
        {
          id: 'hr-positions',
          name: 'Postes',
          sequence: 30,
          route: '/hr/positions',
          icon: 'briefcase',
          parent: 'hr'
        },
        {
          id: 'hr-contracts',
          name: 'Contrats',
          sequence: 40,
          route: '/hr/contracts',
          icon: 'file-text',
          parent: 'hr'
        },
        {
          id: 'hr-leaves',
          name: 'Congés',
          sequence: 50,
          route: '/hr/leaves',
          icon: 'calendar',
          parent: 'hr'
        },
        {
          id: 'hr-attendance',
          name: 'Présences',
          sequence: 60,
          route: '/hr/attendance',
          icon: 'clock',
          parent: 'hr'
        },
        {
          id: 'hr-evaluations',
          name: 'Évaluations',
          sequence: 70,
          route: '/hr/evaluations',
          icon: 'star',
          parent: 'hr'
        },
        {
          id: 'hr-skills',
          name: 'Compétences',
          sequence: 80,
          route: '/hr/skills',
          icon: 'award',
          parent: 'hr'
        },
        {
          id: 'hr-settings',
          name: 'Paramètres RH',
          sequence: 90,
          route: '/hr/settings',
          icon: 'settings',
          parent: 'hr'
        }
      ]
    }
  ]
};

export default manifest;
