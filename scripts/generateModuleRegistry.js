/**
 * Script pour générer automatiquement le registre des modules
 *
 * Ce script scanne le dossier addons, identifie tous les modules valides
 * et génère automatiquement le fichier ModuleRegistry.ts
 *
 * Usage: node scripts/generateModuleRegistry.js
 */

const fs = require('fs');
const path = require('path');

// Chemins
const ADDONS_DIR = path.resolve(__dirname, '../addons');
const OUTPUT_FILE = path.resolve(__dirname, '../src/core/ModuleRegistry.ts');

/**
 * Vérifie si un dossier est un module valide
 * Un module valide doit avoir un fichier index.ts et un fichier manifest.ts
 */
function isValidModule(modulePath) {
  return (
    fs.existsSync(path.join(modulePath, 'index.ts')) &&
    fs.existsSync(path.join(modulePath, 'manifest.ts'))
  );
}

/**
 * Génère le contenu du fichier ModuleRegistry.ts
 */
function generateRegistryContent(moduleNames) {
  return `/**
 * Registre des modules de l'application
 *
 * ATTENTION: Ce fichier est généré automatiquement par le script generateModuleRegistry.js
 * Ne pas modifier manuellement ce fichier, il sera écrasé à la prochaine génération.
 */

import { Addon } from '../types/addon';

// Liste des noms de modules disponibles
// Cette liste est générée automatiquement en fonction des modules présents dans le dossier addons
export const AVAILABLE_MODULE_NAMES = [
${moduleNames.map(name => `  '${name}',`).join('\n')}
];

// Fonction pour charger dynamiquement un module
async function loadModule(moduleName: string): Promise<any> {
  try {
    // Utilisation de l'import dynamique pour charger le module
    return await import(\`../../addons/\${moduleName}/index.ts\`);
  } catch (error) {
    console.error(\`Erreur lors du chargement du module \${moduleName}:\`, error);
    return null;
  }
}

/**
 * Récupère la liste des noms de modules disponibles
 * @returns Liste des noms de modules
 */
export const getAvailableModuleNames = (): string[] => {
  return AVAILABLE_MODULE_NAMES;
};

/**
 * Récupère un module par son nom
 * @param moduleName Nom du module
 * @returns Promise résolvant vers le module ou null s'il n'existe pas
 */
export const getModule = async (moduleName: string): Promise<any> => {
  if (!AVAILABLE_MODULE_NAMES.includes(moduleName)) {
    return null;
  }
  return await loadModule(moduleName);
};

/**
 * Récupère tous les modules disponibles sous forme d'objets Addon
 * @returns Promise résolvant vers un tableau de modules sous forme d'objets Addon
 */
export const getAllModules = async (): Promise<Addon[]> => {
  const modulePromises = AVAILABLE_MODULE_NAMES.map(async (name) => {
    const module = await loadModule(name);
    if (!module) return null;

    // Vérifier que le module a un manifeste et des routes
    if (!module.manifest || !module.routes) {
      console.warn(\`Le module \${name} n'a pas de manifeste ou de routes définis.\`);
      return null;
    }

    // Construire l'objet Addon
    const addon: Addon = {
      manifest: module.manifest,
      routes: module.routes,
    };

    // Ajouter les fonctions d'initialisation et de nettoyage si elles existent
    if (typeof module.initialize === 'function') {
      addon.initialize = module.initialize;
    }

    if (typeof module.cleanup === 'function') {
      addon.cleanup = module.cleanup;
    }

    // Ajouter les composants si ils existent
    if (module.Components) {
      addon.Components = module.Components;
    }

    return addon;
  });

  // Attendre que tous les modules soient chargés et filtrer les nulls
  const modules = await Promise.all(modulePromises);
  return modules.filter((addon): addon is Addon => addon !== null);
};`;
}

/**
 * Fonction principale
 */
function main() {
  try {
    // Vérifier que le dossier addons existe
    if (!fs.existsSync(ADDONS_DIR)) {
      console.error(`Le dossier addons n'existe pas: ${ADDONS_DIR}`);
      process.exit(1);
    }

    // Lire le contenu du dossier addons
    const addonDirs = fs.readdirSync(ADDONS_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    // Filtrer les modules valides
    const validModules = addonDirs.filter(dir =>
      isValidModule(path.join(ADDONS_DIR, dir))
    );

    if (validModules.length === 0) {
      console.warn('Aucun module valide trouvé dans le dossier addons');
    } else {
      console.log(`Modules valides trouvés: ${validModules.join(', ')}`);
    }

    // Générer le contenu du fichier ModuleRegistry.ts
    const content = generateRegistryContent(validModules);

    // Créer le dossier src/core s'il n'existe pas
    const coreDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(coreDir)) {
      fs.mkdirSync(coreDir, { recursive: true });
    }

    // Écrire le fichier ModuleRegistry.ts
    fs.writeFileSync(OUTPUT_FILE, content);
    console.log(`Fichier ModuleRegistry.ts généré avec succès: ${OUTPUT_FILE}`);
  } catch (error) {
    console.error('Erreur lors de la génération du registre des modules:', error);
    process.exit(1);
  }
}

// Exécuter la fonction principale
main();
