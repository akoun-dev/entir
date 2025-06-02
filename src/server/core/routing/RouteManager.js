'use strict';

/**
 * Gestionnaire de routes pour les modules
 * 
 * Ce module permet de gérer dynamiquement les routes des modules dans le backend.
 * Il fournit des fonctionnalités pour :
 * - Enregistrer automatiquement les routes des modules
 * - Charger dynamiquement les routes lorsqu'un nouveau module est ajouté
 * - Assurer une structure cohérente des routes (préfixage par module)
 * - Gérer les middlewares nécessaires pour chaque route
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const { Module } = require('../../../models');

class RouteManager {
  constructor() {
    // Router principal qui contiendra toutes les routes des modules
    this.router = express.Router();
    
    // Map des routers par module
    this.moduleRouters = new Map();
    
    // Middlewares globaux
    this.globalMiddlewares = [];
    
    // Chemin vers le dossier des modules
    this.addonsDir = path.resolve(__dirname, '../../../../addons');
    
    // Vérifier que le dossier des modules existe
    if (!fs.existsSync(this.addonsDir)) {
      console.error(`ERREUR: Le dossier des modules n'existe pas à l'emplacement ${this.addonsDir}`);
    }
  }

  /**
   * Initialise le gestionnaire de routes
   * @returns {express.Router} Router Express contenant toutes les routes
   */
  async initialize() {
    console.log('Initialisation du gestionnaire de routes...');
    
    try {
      // Charger les modules depuis la base de données
      const modules = await Module.findAll({
        where: { active: true, installed: true },
        order: [['name', 'ASC']]
      });
      
      console.log(`${modules.length} modules actifs trouvés.`);
      
      // Charger les routes pour chaque module
      for (const module of modules) {
        await this.loadModuleRoutes(module.name);
      }
      
      // Ajouter une route par défaut pour la documentation
      this.router.get('/', (req, res) => {
        res.json({
          message: 'API Backend - Documentation des routes',
          modules: Array.from(this.moduleRouters.keys()).map(moduleName => ({
            name: moduleName,
            basePath: `/${moduleName}`
          }))
        });
      });
      
      return this.router;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du gestionnaire de routes:', error);
      throw error;
    }
  }

  /**
   * Ajoute un middleware global qui sera appliqué à toutes les routes
   * @param {Function} middleware Middleware Express
   */
  addGlobalMiddleware(middleware) {
    this.globalMiddlewares.push(middleware);
    this.router.use(middleware);
  }

  /**
   * Charge les routes d'un module
   * @param {string} moduleName Nom du module
   */
  async loadModuleRoutes(moduleName) {
    console.log(`Chargement des routes pour le module ${moduleName}...`);
    
    try {
      // Vérifier si le module existe
      const modulePath = path.join(this.addonsDir, moduleName);
      if (!fs.existsSync(modulePath)) {
        console.error(`Le module ${moduleName} n'existe pas dans le dossier ${this.addonsDir}`);
        return;
      }
      
      // Vérifier si le module a un dossier routes
      const routesDir = path.join(modulePath, 'routes');
      const apiRoutesFile = path.join(modulePath, 'api-routes.js');
      
      // Créer un router pour le module
      const moduleRouter = express.Router();
      
      // Appliquer les middlewares globaux au router du module
      this.globalMiddlewares.forEach(middleware => {
        moduleRouter.use(middleware);
      });
      
      // Charger les routes depuis le dossier routes s'il existe
      if (fs.existsSync(routesDir)) {
        await this.loadRoutesFromDirectory(routesDir, moduleRouter);
      }
      
      // Charger les routes depuis le fichier api-routes.js s'il existe
      if (fs.existsSync(apiRoutesFile)) {
        await this.loadRoutesFromFile(apiRoutesFile, moduleRouter);
      }
      
      // Si aucune route n'a été trouvée, générer une route par défaut
      if (!moduleRouter.stack || moduleRouter.stack.length === 0) {
        moduleRouter.get('/', (req, res) => {
          res.json({
            message: `API du module ${moduleName}`,
            status: 'Aucune route définie'
          });
        });
      }
      
      // Enregistrer le router du module
      this.moduleRouters.set(moduleName, moduleRouter);
      
      // Monter le router du module sur le router principal avec le préfixe du module
      this.router.use(`/${moduleName}`, moduleRouter);
      
      console.log(`Routes du module ${moduleName} chargées avec succès.`);
    } catch (error) {
      console.error(`Erreur lors du chargement des routes pour le module ${moduleName}:`, error);
    }
  }

  /**
   * Charge les routes depuis un dossier
   * @param {string} directory Chemin vers le dossier contenant les routes
   * @param {express.Router} router Router Express sur lequel monter les routes
   */
  async loadRoutesFromDirectory(directory, router) {
    console.log(`Chargement des routes depuis le dossier ${directory}...`);
    
    try {
      // Lire les fichiers du dossier
      const files = fs.readdirSync(directory);
      
      // Charger chaque fichier de route
      for (const file of files) {
        // Ignorer les fichiers qui ne sont pas des fichiers JavaScript
        if (!file.endsWith('.js')) continue;
        
        const routeFile = path.join(directory, file);
        await this.loadRoutesFromFile(routeFile, router);
      }
    } catch (error) {
      console.error(`Erreur lors du chargement des routes depuis le dossier ${directory}:`, error);
    }
  }

  /**
   * Charge les routes depuis un fichier
   * @param {string} file Chemin vers le fichier contenant les routes
   * @param {express.Router} router Router Express sur lequel monter les routes
   */
  async loadRoutesFromFile(file, router) {
    console.log(`Chargement des routes depuis le fichier ${file}...`);
    
    try {
      // Charger le module de routes
      const routeModule = require(file);
      
      // Si le module exporte un router Express, l'utiliser directement
      if (routeModule.router && typeof routeModule.router.use === 'function') {
        router.use('/', routeModule.router);
        console.log(`Router Express trouvé dans ${file} et monté avec succès.`);
        return;
      }
      
      // Si le module exporte une fonction, l'appeler avec le router
      if (typeof routeModule === 'function') {
        routeModule(router);
        console.log(`Fonction d'initialisation trouvée dans ${file} et exécutée avec succès.`);
        return;
      }
      
      // Si le module exporte un objet avec une méthode register, l'appeler
      if (routeModule.register && typeof routeModule.register === 'function') {
        routeModule.register(router);
        console.log(`Méthode register trouvée dans ${file} et exécutée avec succès.`);
        return;
      }
      
      console.warn(`Aucune route n'a pu être chargée depuis ${file}. Format non reconnu.`);
    } catch (error) {
      console.error(`Erreur lors du chargement des routes depuis le fichier ${file}:`, error);
    }
  }

  /**
   * Recharge les routes d'un module
   * @param {string} moduleName Nom du module
   */
  async reloadModuleRoutes(moduleName) {
    console.log(`Rechargement des routes pour le module ${moduleName}...`);
    
    try {
      // Supprimer les routes existantes du module
      if (this.moduleRouters.has(moduleName)) {
        const moduleRouter = this.moduleRouters.get(moduleName);
        
        // Supprimer toutes les routes du router du module
        moduleRouter.stack = [];
        
        console.log(`Routes existantes du module ${moduleName} supprimées.`);
      }
      
      // Charger les nouvelles routes
      await this.loadModuleRoutes(moduleName);
      
      console.log(`Routes du module ${moduleName} rechargées avec succès.`);
    } catch (error) {
      console.error(`Erreur lors du rechargement des routes pour le module ${moduleName}:`, error);
    }
  }

  /**
   * Recharge toutes les routes
   */
  async reloadAllRoutes() {
    console.log('Rechargement de toutes les routes...');
    
    try {
      // Vider le router principal
      this.router.stack = [];
      
      // Réappliquer les middlewares globaux
      this.globalMiddlewares.forEach(middleware => {
        this.router.use(middleware);
      });
      
      // Vider la map des routers par module
      this.moduleRouters.clear();
      
      // Réinitialiser le gestionnaire de routes
      await this.initialize();
      
      console.log('Toutes les routes ont été rechargées avec succès.');
    } catch (error) {
      console.error('Erreur lors du rechargement de toutes les routes:', error);
    }
  }
}

// Exporter une instance unique du gestionnaire de routes
module.exports = new RouteManager();
