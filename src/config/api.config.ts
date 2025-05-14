/**
 * Configuration centralisée pour l'API
 * Ce fichier contient les paramètres de configuration pour les appels API
 */

// Utiliser les variables d'environnement si disponibles, sinon utiliser des valeurs par défaut
export const API_CONFIG = {
  // URL de base de l'API
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  
  // Timeout par défaut pour les requêtes (en millisecondes)
  TIMEOUT: 30000,
  
  // En-têtes par défaut pour toutes les requêtes
  HEADERS: {
    'Content-Type': 'application/json',
  },
  
  // Paramètres pour la gestion des erreurs
  ERROR_HANDLING: {
    // Nombre de tentatives pour les requêtes qui échouent
    RETRY_COUNT: 3,
    // Délai entre les tentatives (en millisecondes)
    RETRY_DELAY: 1000,
  }
};

/**
 * Fonction utilitaire pour construire des URLs d'API
 * @param endpoint Point de terminaison de l'API (sans le slash initial)
 * @returns URL complète pour l'appel API
 */
export const getApiUrl = (endpoint: string): string => {
  // S'assurer que l'endpoint ne commence pas par un slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${API_CONFIG.BASE_URL}/${cleanEndpoint}`;
};

export default API_CONFIG;
