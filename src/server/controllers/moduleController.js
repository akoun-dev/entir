'use strict';

const { Module } = require('../../models');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);
const { Sequelize } = require('sequelize');

// Chemin vers le dossier des modules
const ADDONS_DIR = path.resolve(__dirname, '../../../addons');
console.log('Chemin vers le dossier des modules:', ADDONS_DIR);

// Vérifier que le dossier des modules existe
if (!fs.existsSync(ADDONS_DIR)) {
  console.error(`ERREUR: Le dossier des modules n'existe pas à l'emplacement ${ADDONS_DIR}`);
} else {
  console.log(`Dossier des modules trouvé: ${ADDONS_DIR}`);
  // Lister les modules disponibles
  try {
    const modules = fs.readdirSync(ADDONS_DIR);
    console.log('Modules disponibles:', modules);
  } catch (error) {
    console.error(`Erreur lors de la lecture du dossier des modules:`, error);
  }
}

/**
 * Contrôleur pour la gestion des modules
 */
const moduleController = {
  /**
   * Récupère tous les modules
   */
  async getAllModules(req, res) {
    try {
      const modules = await Module.findAll({
        order: [['displayName', 'ASC']]
      });

      return res.status(200).json(modules);
    } catch (error) {
      console.error('Erreur lors de la récupération des modules:', error);
      return res.status(500).json({
        message: 'Une erreur est survenue lors de la récupération des modules',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * Scanne les modules dans le dossier addons et met à jour la base de données
   */
  async scanModules(req, res) {
    try {
      console.log('Démarrage du scan des modules...');

      // Vérifier que le dossier addons existe, sinon le créer
      if (!fs.existsSync(ADDONS_DIR)) {
        console.log(`Le dossier addons n'existe pas, création du dossier: ${ADDONS_DIR}`);
        try {
          fs.mkdirSync(ADDONS_DIR, { recursive: true });
          console.log(`Dossier addons créé avec succès: ${ADDONS_DIR}`);
        } catch (error) {
          console.error(`Erreur lors de la création du dossier addons:`, error);
          return res.status(500).json({
            message: 'Erreur lors de la création du dossier addons',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
          });
        }
      }

      // Exécuter le script generateModuleRegistry.js pour générer le registre des modules
      console.log('Exécution du script generateModuleRegistry.js...');
      try {
        const generateRegistryScript = path.resolve(__dirname, '../../../scripts/generateModuleRegistry.js');
        const { stdout, stderr } = await execPromise(`node ${generateRegistryScript}`);
        console.log('Résultat de la génération du registre:', stdout);
        if (stderr) {
          console.error('Erreurs lors de la génération du registre:', stderr);
        }
      } catch (error) {
        console.error('Erreur lors de l\'exécution du script de génération du registre:', error);
        // Continuer malgré l'erreur, nous allons quand même scanner les modules
        console.log('Continuation du scan des modules malgré l\'erreur...');
      }

      // Lire le contenu du dossier addons
      console.log(`Lecture du dossier des modules: ${ADDONS_DIR}`);
      const addonDirs = fs.readdirSync(ADDONS_DIR, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      console.log('Modules trouvés dans le dossier addons:', addonDirs);

      // Fonction pour vérifier si un dossier est un module valide
      // Un module valide doit avoir un fichier index.ts et un fichier manifest.ts
      // Cette fonction est identique à celle utilisée dans generateModuleRegistry.js
      const isValidModule = (modulePath) => {
        const hasIndexTs = fs.existsSync(path.join(modulePath, 'index.ts'));
        const hasManifestTs = fs.existsSync(path.join(modulePath, 'manifest.ts'));

        // Pour la compatibilité, vérifier aussi les fichiers .js
        const hasIndexJs = fs.existsSync(path.join(modulePath, 'index.js'));
        const hasManifestJs = fs.existsSync(path.join(modulePath, 'manifest.js'));

        // Un module est valide s'il a un fichier index et un fichier manifest
        const isValid = (hasIndexTs || hasIndexJs) && (hasManifestTs || hasManifestJs);

        if (!isValid) {
          console.log(`Le dossier ${path.basename(modulePath)} n'est pas un module valide:`);
          console.log(`- index.ts: ${hasIndexTs}, index.js: ${hasIndexJs}`);
          console.log(`- manifest.ts: ${hasManifestTs}, manifest.js: ${hasManifestJs}`);
        } else {
          console.log(`Le dossier ${path.basename(modulePath)} est un module valide`);
        }

        return isValid;
      };

      // Filtrer les modules valides
      const validModules = addonDirs.filter(dir => {
        const modulePath = path.join(ADDONS_DIR, dir);
        const isValid = isValidModule(modulePath);
        console.log(`Module ${dir}: ${isValid ? 'valide' : 'non valide'}`);
        return isValid;
      });

      console.log('Modules valides trouvés:', validModules);

      // Fonction pour lire le manifeste d'un module
      // Cette fonction est similaire à celle utilisée dans generateModuleRegistry.js
      const readModuleManifest = (modulePath) => {
        try {
          // Déterminer le chemin du manifeste (manifest.ts ou manifest.js)
          let manifestPath;
          if (fs.existsSync(path.join(modulePath, 'manifest.ts'))) {
            manifestPath = path.join(modulePath, 'manifest.ts');
          } else if (fs.existsSync(path.join(modulePath, 'manifest.js'))) {
            manifestPath = path.join(modulePath, 'manifest.js');
          } else {
            console.error(`Aucun fichier manifest.ts ou manifest.js trouvé dans ${modulePath}`);
            return null;
          }

          console.log(`Lecture du manifeste: ${manifestPath}`);
          const manifestContent = fs.readFileSync(manifestPath, 'utf8');

          // Extraire les informations du manifeste à l'aide d'expressions régulières
          const nameMatch = manifestContent.match(/name:\s*['"]([^'"]+)['"]/);
          const displayNameMatch = manifestContent.match(/displayName:\s*['"]([^'"]+)['"]/);
          const versionMatch = manifestContent.match(/version:\s*['"]([^'"]+)['"]/);
          const summaryMatch = manifestContent.match(/summary:\s*['"]([^'"]+)['"]/);
          const descriptionMatch = manifestContent.match(/description:\s*['"]([^'"]+)['"]/);

          // Si le nom n'est pas trouvé, utiliser le nom du dossier
          const moduleName = nameMatch ? nameMatch[1] : path.basename(modulePath);

          // Extraire les dépendances
          const depsMatch = manifestContent.match(/dependencies:\s*\[(.*?)\]/s);
          const depsString = depsMatch ? depsMatch[1] : '';
          const dependencies = depsString
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

          const manifest = {
            name: moduleName,
            displayName: displayNameMatch ? displayNameMatch[1] : moduleName,
            version: versionMatch ? versionMatch[1] : '1.0.0',
            summary: summaryMatch ? summaryMatch[1] : '',
            description: descriptionMatch ? descriptionMatch[1] : '',
            dependencies,
            models
          };

          console.log(`Manifeste lu pour le module ${moduleName}:`, manifest);

          return manifest;
        } catch (error) {
          console.error(`Erreur lors de la lecture du manifeste du module ${path.basename(modulePath)}:`, error);
          return null;
        }
      };

      // Garder une trace des modules traités pour la mise à jour de la base de données
      const processedModules = [];

      // Mettre à jour la base de données avec les modules trouvés
      console.log('Mise à jour de la base de données avec les modules trouvés...');
      for (const moduleName of validModules) {
        const modulePath = path.join(ADDONS_DIR, moduleName);
        const manifest = readModuleManifest(modulePath);

        if (!manifest) {
          console.error(`Impossible de lire le manifeste du module ${moduleName}`);
          continue;
        }

        console.log(`Traitement du module ${moduleName}:`, manifest);

        // Ajouter le nom du module à la liste des modules traités
        processedModules.push(manifest.name);

        // Vérifier si le module existe déjà dans la base de données
        let module = await Module.findOne({
          where: { name: manifest.name }
        });

        if (module) {
          // Mettre à jour le module existant
          console.log(`Mise à jour du module existant: ${manifest.name}`);
          await module.update({
            displayName: manifest.displayName,
            version: manifest.version,
            summary: manifest.summary,
            description: manifest.description,
            dependencies: JSON.stringify(manifest.dependencies),
            models: JSON.stringify(manifest.models),
            installable: true,
            updatedAt: new Date()
          });
        } else {
          // Créer un nouveau module
          console.log(`Création d'un nouveau module: ${manifest.name}`);
          module = await Module.create({
            name: manifest.name,
            displayName: manifest.displayName,
            version: manifest.version,
            summary: manifest.summary,
            description: manifest.description,
            active: false,
            installed: false,
            installable: true,
            application: true,
            autoInstall: false,
            dependencies: JSON.stringify(manifest.dependencies),
            models: JSON.stringify(manifest.models),
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }

      console.log('Modules traités:', processedModules);

      // Récupérer tous les modules de la base de données
      console.log('Récupération des modules de la base de données...');
      const dbModules = await Module.findAll();
      console.log(`${dbModules.length} modules trouvés dans la base de données`);

      // Garder une trace des modules mis à jour
      const updatedModuleStatuses = [];

      // Vérifier les modules qui n'existent plus dans le dossier addons
      console.log('Vérification des modules supprimés ou non valides...');
      for (const dbModule of dbModules) {
        // Vérifier si le module a été traité lors du scan
        const moduleProcessed = processedModules.includes(dbModule.name);

        // Vérifier si le module existe toujours dans le dossier addons
        const moduleExists = addonDirs.includes(dbModule.name);

        // Si le module n'a pas été traité, il doit être marqué comme non installable
        if (!moduleProcessed) {
          console.log(`Le module ${dbModule.name} n'a pas été traité lors du scan, marquage comme non installable`);

          // Mettre à jour le statut du module
          await dbModule.update({
            installable: false,
            updatedAt: new Date()
          });

          if (!moduleExists) {
            console.log(`Le module ${dbModule.name} n'existe plus dans le dossier addons`);
            updatedModuleStatuses.push({
              name: dbModule.name,
              status: 'non installable (supprimé)'
            });
          } else {
            console.log(`Le module ${dbModule.name} existe dans le dossier addons mais n'est pas valide ou n'a pas pu être traité`);
            updatedModuleStatuses.push({
              name: dbModule.name,
              status: 'non installable (invalide)'
            });
          }
        } else if (!dbModule.installable) {
          // Le module a été traité et devrait être installable
          console.log(`Le module ${dbModule.name} est valide, marquage comme installable`);

          await dbModule.update({
            installable: true,
            updatedAt: new Date()
          });

          updatedModuleStatuses.push({
            name: dbModule.name,
            status: 'installable'
          });
        }
      }

      // Vérifier s'il y a des modules dans le dossier addons qui ne sont pas dans la base de données
      console.log('Vérification des nouveaux modules...');
      for (const moduleName of validModules) {
        const dbModule = dbModules.find(m => m.name === moduleName);
        if (!dbModule) {
          console.log(`Le module ${moduleName} est présent dans le dossier addons mais pas dans la base de données`);

          // Ajouter le module à la liste des modules traités s'il n'y est pas déjà
          if (!processedModules.includes(moduleName)) {
            console.log(`Ajout du module ${moduleName} à la liste des modules traités`);
            processedModules.push(moduleName);
          }
        }
      }

      console.log('Statuts des modules mis à jour:', updatedModuleStatuses);

      // Si aucun module valide n'a été trouvé, créer un module de démonstration
      if (validModules.length === 0) {
        console.log('Aucun module valide trouvé, création d\'un module de démonstration pour test');

        // Vérifier si le module de démonstration existe déjà
        let demoModule = await Module.findOne({
          where: { name: 'demo' }
        });

        if (!demoModule) {
          // Créer un module de démonstration
          demoModule = await Module.create({
            name: 'demo',
            displayName: 'Module de Démonstration',
            version: '1.0.0',
            summary: 'Module de démonstration pour tester la fonctionnalité de scan',
            description: 'Ce module est créé automatiquement pour tester la fonctionnalité de scan des modules.',
            active: false,
            installed: false,
            installable: true,
            application: true,
            autoInstall: false,
            dependencies: JSON.stringify([]),
            models: JSON.stringify([]),
            createdAt: new Date(),
            updatedAt: new Date()
          });

          console.log('Module de démonstration créé avec succès');
        } else {
          console.log('Le module de démonstration existe déjà');

          // Mettre à jour le module de démonstration
          await demoModule.update({
            installable: true,
            updatedAt: new Date()
          });

          console.log('Module de démonstration mis à jour avec succès');
        }
      }

      // Récupérer la liste mise à jour des modules
      const updatedModules = await Module.findAll({
        order: [['displayName', 'ASC']]
      });

      // Identifier les modules qui sont dans le dossier addons mais pas dans la base de données
      const modulesNotInDb = validModules.filter(moduleName =>
        !dbModules.some(dbModule => dbModule.name === moduleName)
      );

      // Identifier les modules qui sont dans la base de données mais pas dans le dossier addons
      const modulesNotInAddons = dbModules
        .filter(dbModule => !addonDirs.includes(dbModule.name))
        .map(dbModule => dbModule.name);

      // Créer un résumé des changements pour le débogage
      const summary = {
        total: updatedModules.length,
        installed: updatedModules.filter(m => m.installed).length,
        active: updatedModules.filter(m => m.active).length,
        installable: updatedModules.filter(m => m.installable).length,
        nonInstallable: updatedModules.filter(m => !m.installable).length,
        scannedDirectories: addonDirs.length,
        validModules: validModules.length,
        processedModules: processedModules,
        updatedStatuses: updatedModuleStatuses,
        // Ajouter des informations sur les modules dans le dossier addons
        modulesInAddonsDir: addonDirs,
        // Ajouter des informations sur les modules valides
        validModulesList: validModules,
        // Ajouter des informations sur les modules traités
        processedModulesList: processedModules,
        // Ajouter des informations sur les modules qui sont dans le dossier addons mais pas dans la base de données
        modulesNotInDb: modulesNotInDb,
        // Ajouter des informations sur les modules qui sont dans la base de données mais pas dans le dossier addons
        modulesNotInAddons: modulesNotInAddons
      };

      console.log('Résumé du scan des modules:', summary);
      console.log('Modules mis à jour:', updatedModules.map(m => ({
        name: m.name,
        installable: m.installable,
        installed: m.installed,
        active: m.active
      })));

      // Créer un message de résumé pour l'utilisateur
      let message = 'Scan des modules terminé avec succès.';

      if (addonDirs.length > 0) {
        message += ` ${addonDirs.length} dossier(s) trouvé(s) dans addons.`;
      }

      if (validModules.length > 0) {
        message += ` ${validModules.length} module(s) valide(s) trouvé(s).`;
      }

      if (processedModules.length > 0) {
        message += ` ${processedModules.length} module(s) traité(s).`;
      }

      if (updatedModuleStatuses.length > 0) {
        const nonInstallableCount = updatedModuleStatuses.filter(
          m => m.status.includes('non installable')
        ).length;

        if (nonInstallableCount > 0) {
          message += ` ${nonInstallableCount} module(s) marqué(s) comme non installable(s).`;
        }
      }

      // Ajouter des informations sur les modules qui sont dans le dossier addons mais pas dans la base de données
      if (modulesNotInDb.length > 0) {
        message += ` ${modulesNotInDb.length} module(s) présent(s) dans le dossier addons mais pas dans la base de données: ${modulesNotInDb.join(', ')}.`;
      }

      // Ajouter des informations sur les modules qui sont dans la base de données mais pas dans le dossier addons
      if (modulesNotInAddons.length > 0) {
        message += ` ${modulesNotInAddons.length} module(s) présent(s) dans la base de données mais pas dans le dossier addons: ${modulesNotInAddons.join(', ')}.`;
      }

      return res.status(200).json({
        message: message,
        modules: updatedModules,
        summary: summary
      });
    } catch (error) {
      console.error('Erreur lors du scan des modules:', error);
      return res.status(500).json({
        message: 'Une erreur est survenue lors du scan des modules',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * Récupère un module par son nom
   */
  async getModuleByName(req, res) {
    try {
      const { name } = req.params;

      const module = await Module.findOne({
        where: { name }
      });

      if (!module) {
        return res.status(404).json({
          message: `Le module ${name} n'existe pas`
        });
      }

      return res.status(200).json(module);
    } catch (error) {
      console.error(`Erreur lors de la récupération du module ${req.params.name}:`, error);
      return res.status(500).json({
        message: `Une erreur est survenue lors de la récupération du module ${req.params.name}`,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * Active ou désactive un module
   */
  async toggleModuleStatus(req, res) {
    try {
      const { name } = req.params;
      const { active } = req.body;

      const module = await Module.findOne({
        where: { name }
      });

      if (!module) {
        return res.status(404).json({
          message: `Le module ${name} n'existe pas`
        });
      }

      // Vérifier les dépendances si on désactive le module
      if (active === false) {
        const dependentModules = await Module.findAll({
          where: {
            active: true
          }
        });

        // Vérifier si d'autres modules dépendent de celui-ci - les dépendances sont maintenant automatiquement parsées
        const dependents = dependentModules.filter(m => {
          const deps = m.dependencies;
          return Array.isArray(deps) && deps.includes(name);
        });

        if (dependents.length > 0) {
          return res.status(400).json({
            message: `Impossible de désactiver le module ${name} car d'autres modules en dépendent`,
            dependents: dependents.map(m => m.name)
          });
        }
      }

      // Mettre à jour le statut du module
      module.active = active;
      await module.save();

      return res.status(200).json({
        message: `Le module ${name} a été ${active ? 'activé' : 'désactivé'} avec succès`,
        module
      });
    } catch (error) {
      console.error(`Erreur lors de la modification du statut du module ${req.params.name}:`, error);
      return res.status(500).json({
        message: `Une erreur est survenue lors de la modification du statut du module ${req.params.name}`,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * Installe un module
   */
  async installModule(req, res) {
    try {
      const { name } = req.params;

      console.log(`Tentative d'installation du module ${name}`);

      const module = await Module.findOne({
        where: { name }
      });

      if (!module) {
        console.log(`Le module ${name} n'existe pas dans la base de données`);
        return res.status(404).json({
          message: `Le module ${name} n'existe pas dans la base de données`
        });
      }

      if (module.installed) {
        console.log(`Le module ${name} est déjà installé`);
        return res.status(400).json({
          message: `Le module ${name} est déjà installé`
        });
      }

      // Vérifier que le dossier du module existe
      const modulePath = path.join(ADDONS_DIR, name);
      console.log(`Vérification du chemin du module: ${modulePath}`);

      try {
        // Vérifier si le dossier existe
        const stats = fs.statSync(modulePath);
        if (!stats.isDirectory()) {
          console.log(`Le chemin ${modulePath} existe mais n'est pas un dossier`);
          return res.status(400).json({
            message: `Le chemin ${modulePath} existe mais n'est pas un dossier`
          });
        }

        console.log(`Dossier du module trouvé: ${modulePath}`);

        // Vérifier si le dossier contient un fichier index.ts ou index.js
        const indexTsPath = path.join(modulePath, 'index.ts');
        const indexJsPath = path.join(modulePath, 'index.js');

        if (!fs.existsSync(indexTsPath) && !fs.existsSync(indexJsPath)) {
          console.log(`Le dossier du module ${name} ne contient pas de fichier index.ts ou index.js`);
          return res.status(400).json({
            message: `Le dossier du module ${name} ne contient pas de fichier index.ts ou index.js`
          });
        }

        console.log(`Fichier index trouvé pour le module ${name}`);
      } catch (error) {
        console.log(`Le dossier du module ${name} n'existe pas à l'emplacement ${modulePath}:`, error.message);
        return res.status(400).json({
          message: `Le dossier du module ${name} n'existe pas à l'emplacement ${modulePath}`
        });
      }

      // Vérifier les dépendances - maintenant elles sont automatiquement parsées par le modèle
      const dependencies = module.dependencies;
      const missingDependencies = [];

      console.log(`Vérification des dépendances du module ${name}:`, dependencies);

      // Parcourir les dépendances seulement si c'est un tableau non vide
      if (Array.isArray(dependencies) && dependencies.length > 0) {
        for (const dep of dependencies) {
          if (typeof dep !== 'string') {
            console.log(`Dépendance invalide trouvée:`, dep);
            continue; // Ignorer les dépendances qui ne sont pas des chaînes
          }

          console.log(`Vérification de la dépendance: ${dep}`);
          const dependency = await Module.findOne({
            where: { name: dep, installed: true }
          });

          if (!dependency) {
            console.log(`Dépendance manquante: ${dep}`);
            missingDependencies.push(dep);
          } else {
            console.log(`Dépendance trouvée: ${dep}`);
          }
        }
      }

      if (missingDependencies.length > 0) {
        console.log(`Dépendances manquantes pour le module ${name}: ${missingDependencies.join(', ')}`);
        return res.status(400).json({
          message: `Impossible d'installer le module ${name} car certaines dépendances ne sont pas installées`,
          missingDependencies
        });
      }

      // Créer les tables à partir des modèles du module
      const modelsPath = path.join(modulePath, 'models');
      if (fs.existsSync(modelsPath)) {
        console.log(`Création des tables à partir des modèles du module ${name} depuis ${modelsPath}`);
        try {
          // Créer une instance Sequelize
          const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './database.sqlite',
            logging: console.log
          });

          // Vérifier si les tables du module existent déjà
          // Pour le module HR, les tables commencent par 'hr_'
          // Pour les autres modules, on utilise le préfixe 'name_'
          const modulePrefix = name.toLowerCase() === 'hr' ? 'hr_' : name.toLowerCase() + '_';
          const tables = await sequelize.query(
            `SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '${modulePrefix}%'`,
            {
              type: Sequelize.QueryTypes.SELECT
            }
          );

          const existingTables = tables ? tables.map(t => t.name) : [];
          console.log(`Tables existantes pour le module ${name}: ${existingTables.join(', ') || 'aucune'}`);

          // Charger les modèles du module
          const models = {};
          const DataTypes = Sequelize;

          // Lire les fichiers de modèles
          const modelFiles = fs.readdirSync(modelsPath).filter(file => file.endsWith('.js'));
          console.log(`Fichiers de modèles trouvés: ${modelFiles.join(', ')}`);

          // Charger chaque modèle
          for (const file of modelFiles) {
            const modelPath = path.join(modelsPath, file);
            const modelName = file.replace('.js', '');
            console.log(`Chargement du modèle ${modelName} depuis ${modelPath}`);

            try {
              const modelDefinition = require(modelPath);
              models[modelName] = modelDefinition(sequelize, DataTypes);
              console.log(`Modèle ${modelName} chargé avec succès`);
            } catch (error) {
              console.error(`Erreur lors du chargement du modèle ${modelName}:`, error);
              throw error;
            }
          }

          // Établir les associations entre les modèles
          console.log('Établissement des associations entre les modèles...');
          Object.keys(models).forEach(modelName => {
            if (models[modelName].associate) {
              models[modelName].associate(models);
            }
          });

          // Synchroniser les modèles avec la base de données
          console.log('Synchronisation des modèles avec la base de données...');
          await sequelize.sync({ force: false, alter: true });

          console.log(`Toutes les tables du module ${name} ont été créées ou mises à jour avec succès.`);
        } catch (error) {
          console.error(`Erreur lors de la création des tables du module ${name}:`, error);
          return res.status(500).json({
            message: `Une erreur est survenue lors de la création des tables du module ${name}`,
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
          });
        }
      } else {
        console.log(`Aucun dossier de modèles trouvé pour le module ${name}`);
      }

      // Note: Les seeders ont été supprimés, nous n'avons plus besoin de les exécuter
      console.log(`Le module ${name} n'utilise pas de seeders.`);

      // Mettre à jour le statut du module
      module.installed = true;
      module.installedAt = new Date();
      await module.save();

      console.log(`Module ${name} installé avec succès`);

      return res.status(200).json({
        message: `Le module ${name} a été installé avec succès`,
        module
      });
    } catch (error) {
      console.error(`Erreur lors de l'installation du module ${req.params.name}:`, error);
      return res.status(500).json({
        message: `Une erreur est survenue lors de l'installation du module ${req.params.name}`,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  /**
   * Désinstalle un module
   */
  async uninstallModule(req, res) {
    try {
      const { name } = req.params;

      console.log(`Tentative de désinstallation du module ${name}`);

      const module = await Module.findOne({ where: { name } });

      if (!module) {
        console.log(`Le module ${name} n'existe pas dans la base de données`);
        return res.status(404).json({
          message: `Le module ${name} n'existe pas dans la base de données`
        });
      }

      if (!module.installed) {
        console.log(`Le module ${name} n'est pas installé`);
        return res.status(400).json({
          message: `Le module ${name} n'est pas installé`
        });
      }

      // Vérification si d'autres modules dépendent de celui-ci
      // SQLite ne supporte pas l'opérateur @> pour les tableaux, donc on récupère tous les modules installés
      // et on filtre manuellement ceux qui dépendent du module à désinstaller
      const installedModules = await Module.findAll({
        where: {
          installed: true
        }
      });

      // Filtrer les modules qui ont une dépendance sur le module à désinstaller
      const dependentModules = installedModules.filter(mod => {
        if (!mod.dependencies) return false;
        // Vérifier si les dépendances contiennent le nom du module
        return Array.isArray(mod.dependencies) && mod.dependencies.includes(name);
      });

      if (dependentModules.length > 0) {
        const dependentNames = dependentModules.map(m => m.name);
        console.log(`Le module ${name} est requis par les modules suivants : ${dependentNames.join(', ')}`);
        return res.status(400).json({
          message: `Impossible de désinstaller le module ${name} car d'autres modules en dépendent`,
          dependentModules: dependentNames
        });
      }

      // Suppression des tables du module
      console.log(`Suppression des tables du module ${name}...`);
      try {
        const sequelize = new Sequelize({
          dialect: 'sqlite',
          storage: './database.sqlite',
          logging: console.log
        });

        console.log('Connexion à la base de données établie avec succès');

        // Récupérer les tables du module
        const modulePrefix = name.toLowerCase() + '_';
        console.log(`Recherche des tables avec le préfixe ${modulePrefix}...`);

        const tables = await sequelize.query(
          `SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '${modulePrefix}%'`,
          {
            type: Sequelize.QueryTypes.SELECT
          }
        );

        const tableNames = tables.map(t => t.name);
        console.log(`Tables du module ${name} à supprimer: ${tableNames.join(', ') || 'aucune'}`);

        if (tableNames.length === 0) {
          console.log(`Aucune table trouvée pour le module ${name}`);
        } else {
          // Désactiver les contraintes de clé étrangère
          console.log('Désactivation des contraintes de clé étrangère...');
          await sequelize.query('PRAGMA foreign_keys = OFF;');

          // Supprimer les tables une par une dans un ordre spécifique pour éviter les problèmes de contraintes
          // L'ordre est important : d'abord les tables qui ont des clés étrangères, puis les tables référencées
          console.log('Suppression des tables une par une dans un ordre spécifique...');

          // Ordre de suppression pour le module HR (à adapter pour d'autres modules)
          const tablesInOrder = [
            'hr_contracts', 'hr_leaves', 'hr_employees', 'hr_positions', 'hr_departments', 'hr_leave_types'
          ].filter(t => tableNames.includes(t));

          // Ajouter les tables qui ne sont pas dans l'ordre spécifique
          const remainingTables = tableNames.filter(t => !tablesInOrder.includes(t));
          const allTablesInOrder = [...tablesInOrder, ...remainingTables];

          console.log(`Ordre de suppression des tables: ${allTablesInOrder.join(', ')}`);

          // Supprimer les tables une par une
          for (const tableName of allTablesInOrder) {
            try {
              console.log(`Suppression de la table ${tableName}...`);
              await sequelize.query(`DROP TABLE IF EXISTS ${tableName};`);
              console.log(`Table ${tableName} supprimée avec succès`);
            } catch (error) {
              console.error(`Erreur lors de la suppression de la table ${tableName}:`, error);
            }
          }

          // Réactiver les contraintes de clé étrangère
          await sequelize.query('PRAGMA foreign_keys = ON;');
          console.log('Contraintes de clé étrangère réactivées avec succès');
        }
      } catch (error) {
        console.error(`Erreur lors de la suppression des tables du module ${name}:`, error);
        // Ne pas interrompre la désinstallation en cas d'erreur lors de la suppression des tables
        console.log(`L'erreur sera ignorée et la désinstallation continuera.`);
      }

      // Mise à jour du statut du module
      module.installed = false;
      module.installedAt = null;
      // Désactiver également le module lors de la désinstallation
      module.active = false;
      await module.save();

      console.log(`Module ${name} désinstallé et désactivé avec succès`);

      return res.status(200).json({
        message: `Le module ${name} a été désinstallé et désactivé avec succès`,
        module
      });

    } catch (error) {
      console.error(`Erreur lors de la désinstallation du module ${req.params.name}:`, error);
      return res.status(500).json({
        message: `Une erreur est survenue lors de la désinstallation du module ${req.params.name}`,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

};

module.exports = moduleController;
