'use strict';

/**
 * Middlewares communs pour les routes
 * 
 * Ce module fournit des middlewares réutilisables pour les routes des modules.
 */

/**
 * Middleware pour gérer les erreurs asynchrones
 * @param {Function} fn Fonction de gestionnaire de route asynchrone
 * @returns {Function} Middleware Express
 */
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Middleware pour vérifier l'authentification
 * @param {Object} options Options de configuration
 * @returns {Function} Middleware Express
 */
const authMiddleware = (options = {}) => {
  return (req, res, next) => {
    // Vérifier si l'utilisateur est authentifié
    // Dans une implémentation réelle, cela vérifierait un token JWT ou une session
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({
        message: 'Authentification requise'
      });
    }
    
    // Vérifier le token (exemple simplifié)
    if (token.startsWith('Bearer ')) {
      // Dans une implémentation réelle, vérifier la validité du token
      // et extraire les informations de l'utilisateur
      req.user = {
        id: 1,
        username: 'admin',
        roles: ['admin']
      };
      
      return next();
    }
    
    return res.status(401).json({
      message: 'Token d\'authentification invalide'
    });
  };
};

/**
 * Middleware pour vérifier les permissions
 * @param {string[]} requiredPermissions Liste des permissions requises
 * @returns {Function} Middleware Express
 */
const permissionMiddleware = (requiredPermissions = []) => {
  return (req, res, next) => {
    // Vérifier si l'utilisateur est authentifié
    if (!req.user) {
      return res.status(401).json({
        message: 'Authentification requise'
      });
    }
    
    // Si aucune permission n'est requise, autoriser l'accès
    if (requiredPermissions.length === 0) {
      return next();
    }
    
    // Vérifier si l'utilisateur a les permissions requises
    // Dans une implémentation réelle, cela vérifierait les permissions de l'utilisateur
    const userPermissions = req.user.roles.includes('admin')
      ? ['*'] // L'administrateur a toutes les permissions
      : []; // Dans une implémentation réelle, charger les permissions de l'utilisateur
    
    // Vérifier si l'utilisateur a toutes les permissions requises
    const hasAllPermissions = requiredPermissions.every(permission => {
      return userPermissions.includes('*') || userPermissions.includes(permission);
    });
    
    if (hasAllPermissions) {
      return next();
    }
    
    return res.status(403).json({
      message: 'Accès refusé - Permissions insuffisantes'
    });
  };
};

/**
 * Middleware pour valider les données de la requête
 * @param {Object} schema Schéma de validation
 * @param {string} source Source des données à valider (body, query, params)
 * @returns {Function} Middleware Express
 */
const validationMiddleware = (schema, source = 'body') => {
  return (req, res, next) => {
    // Vérifier si le schéma est valide
    if (!schema || typeof schema !== 'object') {
      console.error('Schéma de validation invalide');
      return next();
    }
    
    // Récupérer les données à valider
    const data = req[source];
    
    // Vérifier si les données sont présentes
    if (!data) {
      return res.status(400).json({
        message: `Aucune donnée trouvée dans ${source}`
      });
    }
    
    // Valider les données (exemple simplifié)
    const errors = [];
    
    // Parcourir les champs du schéma
    Object.entries(schema).forEach(([field, rules]) => {
      // Vérifier si le champ est requis
      if (rules.required && (data[field] === undefined || data[field] === null)) {
        errors.push(`Le champ ${field} est requis`);
        return;
      }
      
      // Si le champ n'est pas présent et n'est pas requis, ignorer les autres validations
      if (data[field] === undefined || data[field] === null) {
        return;
      }
      
      // Vérifier le type
      if (rules.type && typeof data[field] !== rules.type) {
        errors.push(`Le champ ${field} doit être de type ${rules.type}`);
      }
      
      // Vérifier la longueur minimale
      if (rules.minLength && data[field].length < rules.minLength) {
        errors.push(`Le champ ${field} doit contenir au moins ${rules.minLength} caractères`);
      }
      
      // Vérifier la longueur maximale
      if (rules.maxLength && data[field].length > rules.maxLength) {
        errors.push(`Le champ ${field} doit contenir au plus ${rules.maxLength} caractères`);
      }
      
      // Vérifier la valeur minimale
      if (rules.min !== undefined && data[field] < rules.min) {
        errors.push(`Le champ ${field} doit être supérieur ou égal à ${rules.min}`);
      }
      
      // Vérifier la valeur maximale
      if (rules.max !== undefined && data[field] > rules.max) {
        errors.push(`Le champ ${field} doit être inférieur ou égal à ${rules.max}`);
      }
      
      // Vérifier le format (regex)
      if (rules.pattern && !rules.pattern.test(data[field])) {
        errors.push(`Le champ ${field} ne respecte pas le format requis`);
      }
    });
    
    // S'il y a des erreurs, renvoyer une réponse d'erreur
    if (errors.length > 0) {
      return res.status(400).json({
        message: 'Validation échouée',
        errors
      });
    }
    
    // Si tout est valide, passer à la suite
    next();
  };
};

/**
 * Middleware pour logger les requêtes
 * @returns {Function} Middleware Express
 */
const requestLogger = () => {
  return (req, res, next) => {
    const start = Date.now();
    
    // Enregistrer la fin de la requête
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    });
    
    next();
  };
};

module.exports = {
  asyncHandler,
  authMiddleware,
  permissionMiddleware,
  validationMiddleware,
  requestLogger
};
