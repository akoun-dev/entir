'use strict';

/**
 * Utilitaires pour le routage
 * 
 * Ce module fournit des fonctions utilitaires pour le routage des modules.
 */

const fs = require('fs');
const path = require('path');

/**
 * Vérifie si un module est valide
 * @param {string} modulePath Chemin vers le dossier du module
 * @returns {boolean} true si le module est valide, false sinon
 */
function isValidModule(modulePath) {
  // Vérifier si le dossier existe
  if (!fs.existsSync(modulePath)) {
    return false;
  }
  
  // Vérifier si le module a un fichier index.js ou index.ts
  const hasIndexJs = fs.existsSync(path.join(modulePath, 'index.js'));
  const hasIndexTs = fs.existsSync(path.join(modulePath, 'index.ts'));
  
  // Vérifier si le module a un fichier manifest.js ou manifest.ts
  const hasManifestJs = fs.existsSync(path.join(modulePath, 'manifest.js'));
  const hasManifestTs = fs.existsSync(path.join(modulePath, 'manifest.ts'));
  
  return (hasIndexJs || hasIndexTs) && (hasManifestJs || hasManifestTs);
}

/**
 * Lit le manifeste d'un module
 * @param {string} modulePath Chemin vers le dossier du module
 * @returns {Object|null} Manifeste du module ou null en cas d'erreur
 */
function readModuleManifest(modulePath) {
  try {
    // Vérifier si le module a un fichier manifest.js ou manifest.ts
    const manifestJsPath = path.join(modulePath, 'manifest.js');
    const manifestTsPath = path.join(modulePath, 'manifest.ts');
    
    let manifestContent;
    
    if (fs.existsSync(manifestJsPath)) {
      manifestContent = fs.readFileSync(manifestJsPath, 'utf8');
    } else if (fs.existsSync(manifestTsPath)) {
      manifestContent = fs.readFileSync(manifestTsPath, 'utf8');
    } else {
      return null;
    }
    
    // Extraire les informations du manifeste à l'aide d'expressions régulières
    // Note: Cette approche est simplifiée et pourrait ne pas fonctionner pour tous les cas
    
    // Extraire le nom
    const nameMatch = manifestContent.match(/name:\s*['"]([^'"]+)['"]/);
    const name = nameMatch ? nameMatch[1] : null;
    
    // Extraire les dépendances
    const dependenciesMatch = manifestContent.match(/dependencies:\s*\[(.*?)\]/s);
    const dependenciesString = dependenciesMatch ? dependenciesMatch[1] : '';
    const dependencies = dependenciesString
      .split(',')
      .map(dep => dep.trim().replace(/['"]/g, ''))
      .filter(dep => dep);
    
    // Extraire les modèles
    const modelsMatch = manifestContent.match(/models:\s*\[(.*?)\]/s);
    const modelsString = modelsMatch ? modelsMatch[1] : '';
    const models = modelsString
      .split(',')
      .map(model => {
        const trimmed = model.trim();
        if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
          // C'est un objet de définition de modèle, extraire le nom
          const nameMatch = trimmed.match(/name:\s*['"]([^'"]+)['"]/);
          return nameMatch ? nameMatch[1] : null;
        }
        return trimmed.replace(/['"]/g, '');
      })
      .filter(model => model);
    
    return {
      name,
      dependencies,
      models
    };
  } catch (error) {
    console.error(`Erreur lors de la lecture du manifeste du module ${path.basename(modulePath)}:`, error);
    return null;
  }
}

/**
 * Trie les modules en fonction de leurs dépendances
 * @param {string[]} moduleNames Noms des modules
 * @param {Object} manifestsMap Map des manifestes par nom de module
 * @returns {string[]} Modules triés
 */
function sortModulesByDependencies(moduleNames, manifestsMap) {
  // Construire un graphe de dépendances
  const graph = {};
  
  // Initialiser le graphe
  moduleNames.forEach(name => {
    graph[name] = [];
  });
  
  // Ajouter les dépendances au graphe
  moduleNames.forEach(name => {
    const manifest = manifestsMap[name];
    if (manifest && manifest.dependencies) {
      manifest.dependencies.forEach(dep => {
        if (moduleNames.includes(dep)) {
          graph[name].push(dep);
        }
      });
    }
  });
  
  // Tri topologique
  const visited = {};
  const temp = {};
  const result = [];
  
  function visit(node) {
    // Si le nœud est déjà dans le résultat, ne rien faire
    if (visited[node]) {
      return;
    }
    
    // Détecter les cycles
    if (temp[node]) {
      console.error(`Cycle de dépendances détecté impliquant le module ${node}`);
      return;
    }
    
    // Marquer le nœud comme temporairement visité
    temp[node] = true;
    
    // Visiter les dépendances
    graph[node].forEach(dep => {
      visit(dep);
    });
    
    // Marquer le nœud comme visité
    visited[node] = true;
    temp[node] = false;
    
    // Ajouter le nœud au résultat
    result.push(node);
  }
  
  // Visiter tous les nœuds
  moduleNames.forEach(name => {
    if (!visited[name]) {
      visit(name);
    }
  });
  
  return result;
}

/**
 * Génère un nom de route à partir d'un chemin de fichier
 * @param {string} filePath Chemin du fichier
 * @param {string} routesDir Dossier de base des routes
 * @returns {string} Nom de la route
 */
function generateRouteName(filePath, routesDir) {
  // Supprimer l'extension
  const withoutExtension = filePath.replace(/\.[^/.]+$/, '');
  
  // Supprimer le chemin du dossier de routes
  const relativePath = withoutExtension.replace(routesDir, '');
  
  // Remplacer les séparateurs de chemin par des tirets
  const normalized = relativePath.replace(/[\/\\]/g, '-');
  
  // Supprimer le tiret initial s'il existe
  return normalized.startsWith('-') ? normalized.substring(1) : normalized;
}

/**
 * Génère une documentation pour les routes d'un module
 * @param {express.Router} router Router Express du module
 * @param {string} moduleName Nom du module
 * @returns {Object[]} Documentation des routes
 */
function generateRoutesDocumentation(router, moduleName) {
  if (!router || !router.stack) {
    return [];
  }
  
  const routes = [];
  
  // Parcourir la pile de middlewares du router
  router.stack.forEach(layer => {
    if (layer.route) {
      // C'est une route
      const path = layer.route.path;
      const methods = Object.keys(layer.route.methods).map(method => method.toUpperCase());
      
      routes.push({
        path: `/${moduleName}${path}`,
        methods,
        middleware: layer.route.stack.length - 1 // Nombre de middlewares (moins le gestionnaire final)
      });
    } else if (layer.name === 'router') {
      // C'est un sous-router
      // Dans une implémentation plus complète, on pourrait récursivement explorer les sous-routers
    }
  });
  
  return routes;
}

module.exports = {
  isValidModule,
  readModuleManifest,
  sortModulesByDependencies,
  generateRouteName,
  generateRoutesDocumentation
};
