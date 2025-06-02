'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./api-routes');
const { sequelize } = require('../models');
const { RouteManager, middlewares } = require('./core/routing');

// Créer l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middlewares.requestLogger());

// Routes API traditionnelles (pour la compatibilité avec le code existant)
app.use('/api', apiRoutes);

// Routes des modules (nouveau système de routage)
async function setupModuleRoutes() {
  try {
    // Ajouter des middlewares globaux au gestionnaire de routes
    RouteManager.addGlobalMiddleware((req, res, next) => {
      // Ajouter des informations sur l'API
      req.apiVersion = '1.0.0';
      next();
    });

    // Initialiser le gestionnaire de routes
    const moduleRouter = await RouteManager.initialize();

    // Monter le router des modules sur l'application
    app.use('/api', moduleRouter);

    console.log('Routes des modules chargées avec succès.');
  } catch (error) {
    console.error('Erreur lors du chargement des routes des modules:', error);
  }
}

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Démarrer le serveur
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Vérifier la connexion à la base de données
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');

    // Configurer les routes des modules
    await setupModuleRoutes();

    // Démarrer le serveur
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });
  } catch (error) {
    console.error('Impossible de se connecter à la base de données:', error);
    process.exit(1);
  }
}

// Exporter pour les tests
module.exports = { app, startServer };

// Si ce fichier est exécuté directement, démarrer le serveur
if (require.main === module) {
  startServer();
}
