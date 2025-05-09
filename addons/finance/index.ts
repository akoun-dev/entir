// Exporter les vues
export * from './views';

// Exporter les routes
export { default as routes } from './routes';

// Exporter le manifeste
export { default as manifest } from './manifest';

// Exporter les composants pour l'enregistrement des routes
import {
  FinanceDashboardView,
  InvoicesView,
  PaymentsView,
  ReportsView
} from './views/pages';

export const Components = {
  FinanceDashboardView,
  InvoicesView,
  PaymentsView,
  ReportsView
};

// Fonctions d'initialisation et de nettoyage
export function initialize() {
  console.log('[Finance Addon] Initialisation de l\'addon Finance');
  // Code d'initialisation...
}

export function cleanup() {
  console.log('[Finance Addon] Nettoyage de l\'addon Finance');
  // Code de nettoyage...
}
