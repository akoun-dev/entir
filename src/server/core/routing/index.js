'use strict';

/**
 * Système de routage modulaire
 * 
 * Ce module exporte tous les éléments du système de routage modulaire.
 */

const RouteManager = require('./RouteManager');
const middlewares = require('./middlewares');
const utils = require('./utils');
const RouteTypes = require('./RouteTypes');

module.exports = {
  // Gestionnaire de routes
  RouteManager,
  
  // Middlewares
  middlewares,
  
  // Utilitaires
  utils,
  
  // Types de routes
  ...RouteTypes
};
