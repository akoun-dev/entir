
// Exporter les modèles
export * from './models';

// Exporter les vues
export * from './views';

// Exporter les services
export * from './services';

// Exporter les hooks
export { useDepartmentForm } from './hooks';
export { useEmployee, useEmployeeForm } from './hooks';

// Exporter les routes
export { default as routes } from './routes';

// Exporter le manifeste
export { default as manifest } from './manifest';

// Exporter les composants pour l'enregistrement des routes
import {
  HrDashboardView,
  EmployeesView,
  EmployeeFormView,
  EmployeeDetailView,
  DepartmentsView,
  DepartmentFormView,
  DepartmentDetailView,
  DocumentsView,
  SettingsView,
  ConfigView,
  ContractsView,
  LeavesView,
  TrainingView,
  RecruitmentView
} from './views/pages';

export const Components = {
  HrDashboardView,
  EmployeesView,
  EmployeeFormView,
  EmployeeDetailView,
  DepartmentsView,
  DepartmentFormView,
  DepartmentDetailView,
  DocumentsView,
  SettingsView,
  ConfigView,
  ContractsView,
  LeavesView,
  TrainingView,
  RecruitmentView
};

// Fonctions d'initialisation et de nettoyage
export function initialize() {
  console.log('[HR Addon] Initialisation de l\'addon HR');
  // Code d'initialisation...
}

export function cleanup() {
  console.log('[HR Addon] Nettoyage de l\'addon HR');
  // Code de nettoyage...
}
