// Exporter les vues
export * from './views';

// Exporter les routes
export { default as routes } from './routes';

// Exporter le manifeste
export { default as manifest } from './manifest';

// Exporter les composants pour l'enregistrement des routes
import { ProjectDashboardView } from './views/pages';

export const Components = {
  ProjectDashboardView
};

// Fonctions d'initialisation et de nettoyage
export function initialize() {
  console.log('[Project Addon] Initialisation de l\'addon Projet');
  // Code d'initialisation...
}

export function cleanup() {
  console.log('[Project Addon] Nettoyage de l\'addon Projet');
  // Code de nettoyage...
}
