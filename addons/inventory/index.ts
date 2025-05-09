// Exporter les vues
export * from './views';

// Exporter les routes
export { default as routes } from './routes';

// Exporter le manifeste
export { default as manifest } from './manifest';

// Exporter les composants pour l'enregistrement des routes
import { InventoryDashboardView } from './views/pages';

export const Components = {
  InventoryDashboardView
};

// Fonctions d'initialisation et de nettoyage
export function initialize() {
  console.log('[Inventory Addon] Initialisation de l\'addon Inventaire');
  // Code d'initialisation...
}

export function cleanup() {
  console.log('[Inventory Addon] Nettoyage de l\'addon Inventaire');
  // Code de nettoyage...
}
