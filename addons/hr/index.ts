import manifest from './manifest';
import routes from './routes.tsx';
import { initialize, cleanup } from './setup';
import * as Components from './components';

/**
 * Module de Ressources Humaines
 *
 * Ce module exporte :
 * - Le manifeste qui décrit le module
 * - Les routes pour l'interface utilisateur
 * - Les fonctions d'initialisation et de nettoyage
 * - Les composants réutilisables
 */

export {
  manifest,
  routes,
  initialize,
  cleanup,
  Components
};
