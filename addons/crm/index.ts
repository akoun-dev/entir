// Exporter les vues
export * from './views';

// Exporter les routes
export { default as routes } from './routes';

// Exporter le manifeste
export { default as manifest } from './manifest';

// Exporter les composants pour l'enregistrement des routes
import { CrmDashboardView } from './views/pages';

export const Components = {
  CrmDashboardView
};

// Fonctions d'initialisation et de nettoyage
export function initialize() {
  console.log('[CRM Addon] Initialisation de l\'addon CRM');
  // Code d'initialisation...
}

export function cleanup() {
  console.log('[CRM Addon] Nettoyage de l\'addon CRM');
  // Code de nettoyage...
}
