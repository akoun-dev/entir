'use strict';

/**
 * Routes API du module HR
 * 
 * Ce module exporte les routes API du module HR.
 * Il est utilisé par le système de routage modulaire pour charger les routes du module.
 */

const routes = require('./routes');

/**
 * Fonction d'initialisation des routes
 * @param {express.Router} router Router Express
 */
function register(router) {
  // Monter les routes du module HR
  router.use('/', routes);
}

module.exports = {
  register
};
