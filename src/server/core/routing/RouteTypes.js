'use strict';

/**
 * Types de routes pour les modules
 * 
 * Ce module définit les différents types de routes qui peuvent être utilisés
 * dans les modules pour standardiser la création de routes.
 */

const { asyncHandler, authMiddleware, permissionMiddleware, validationMiddleware } = require('./middlewares');

/**
 * Classe de base pour les routes
 */
class BaseRoute {
  /**
   * Constructeur
   * @param {Object} options Options de la route
   * @param {string} options.path Chemin de la route
   * @param {string} options.method Méthode HTTP (GET, POST, PUT, DELETE, etc.)
   * @param {Function} options.handler Gestionnaire de la route
   * @param {Function[]} options.middlewares Middlewares supplémentaires
   */
  constructor(options) {
    this.path = options.path || '/';
    this.method = (options.method || 'get').toLowerCase();
    this.handler = options.handler;
    this.middlewares = options.middlewares || [];
    
    // Vérifier que le gestionnaire est défini
    if (!this.handler || typeof this.handler !== 'function') {
      throw new Error('Le gestionnaire de route doit être une fonction');
    }
    
    // Vérifier que la méthode est valide
    const validMethods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];
    if (!validMethods.includes(this.method)) {
      throw new Error(`Méthode HTTP invalide: ${this.method}`);
    }
  }
  
  /**
   * Enregistre la route sur un router Express
   * @param {express.Router} router Router Express
   */
  register(router) {
    // Vérifier que le router est valide
    if (!router || typeof router[this.method] !== 'function') {
      throw new Error('Router Express invalide');
    }
    
    // Enregistrer la route avec ses middlewares
    router[this.method](
      this.path,
      ...this.middlewares,
      asyncHandler(this.handler)
    );
  }
}

/**
 * Route publique (accessible sans authentification)
 */
class PublicRoute extends BaseRoute {
  /**
   * Constructeur
   * @param {Object} options Options de la route
   * @param {string} options.path Chemin de la route
   * @param {string} options.method Méthode HTTP (GET, POST, PUT, DELETE, etc.)
   * @param {Function} options.handler Gestionnaire de la route
   * @param {Function[]} options.middlewares Middlewares supplémentaires
   * @param {Object} options.validation Schéma de validation
   * @param {string} options.validationSource Source des données à valider (body, query, params)
   */
  constructor(options) {
    super(options);
    
    // Ajouter le middleware de validation si un schéma est fourni
    if (options.validation) {
      this.middlewares.unshift(validationMiddleware(options.validation, options.validationSource || 'body'));
    }
  }
}

/**
 * Route protégée (nécessite une authentification)
 */
class ProtectedRoute extends BaseRoute {
  /**
   * Constructeur
   * @param {Object} options Options de la route
   * @param {string} options.path Chemin de la route
   * @param {string} options.method Méthode HTTP (GET, POST, PUT, DELETE, etc.)
   * @param {Function} options.handler Gestionnaire de la route
   * @param {Function[]} options.middlewares Middlewares supplémentaires
   * @param {Object} options.validation Schéma de validation
   * @param {string} options.validationSource Source des données à valider (body, query, params)
   * @param {Object} options.auth Options d'authentification
   */
  constructor(options) {
    super(options);
    
    // Ajouter le middleware d'authentification
    this.middlewares.unshift(authMiddleware(options.auth || {}));
    
    // Ajouter le middleware de validation si un schéma est fourni
    if (options.validation) {
      this.middlewares.unshift(validationMiddleware(options.validation, options.validationSource || 'body'));
    }
  }
}

/**
 * Route avec permissions (nécessite une authentification et des permissions spécifiques)
 */
class PermissionRoute extends ProtectedRoute {
  /**
   * Constructeur
   * @param {Object} options Options de la route
   * @param {string} options.path Chemin de la route
   * @param {string} options.method Méthode HTTP (GET, POST, PUT, DELETE, etc.)
   * @param {Function} options.handler Gestionnaire de la route
   * @param {Function[]} options.middlewares Middlewares supplémentaires
   * @param {Object} options.validation Schéma de validation
   * @param {string} options.validationSource Source des données à valider (body, query, params)
   * @param {Object} options.auth Options d'authentification
   * @param {string[]} options.permissions Liste des permissions requises
   */
  constructor(options) {
    super(options);
    
    // Ajouter le middleware de vérification des permissions
    this.middlewares.splice(1, 0, permissionMiddleware(options.permissions || []));
  }
}

/**
 * Crée une route publique
 * @param {Object} options Options de la route
 * @returns {PublicRoute} Instance de route publique
 */
function createPublicRoute(options) {
  return new PublicRoute(options);
}

/**
 * Crée une route protégée
 * @param {Object} options Options de la route
 * @returns {ProtectedRoute} Instance de route protégée
 */
function createProtectedRoute(options) {
  return new ProtectedRoute(options);
}

/**
 * Crée une route avec permissions
 * @param {Object} options Options de la route
 * @returns {PermissionRoute} Instance de route avec permissions
 */
function createPermissionRoute(options) {
  return new PermissionRoute(options);
}

module.exports = {
  BaseRoute,
  PublicRoute,
  ProtectedRoute,
  PermissionRoute,
  createPublicRoute,
  createProtectedRoute,
  createPermissionRoute
};
