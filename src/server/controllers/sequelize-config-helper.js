'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { v4: uuidv4 } = require('uuid');

/**
 * Crée un fichier de configuration temporaire pour Sequelize CLI
 * Cette fonction est utile pour gérer les chemins avec des espaces
 *
 * @param {string} migrationsPath - Chemin vers le dossier des migrations
 * @param {string} seedersPath - Chemin vers le dossier des seeders (optionnel)
 * @returns {string} - Chemin vers le fichier de configuration temporaire
 */
const createTempSequelizeConfig = (migrationsPath, seedersPath = null) => {
  // Créer un fichier temporaire avec un nom unique
  const tempDir = os.tmpdir();
  const configFileName = `sequelize-config-${uuidv4()}.json`;
  const configFilePath = path.join(tempDir, configFileName);

  // Créer la configuration
  const config = {
    development: {
      dialect: 'sqlite',
      storage: './database.sqlite',
      migrationStorageTableName: 'sequelize_meta',
      seederStorageTableName: 'sequelize_data',
      // Ajouter ces options pour s'assurer que les migrations sont exécutées correctement
      migrationStorage: 'sequelize',
      seederStorage: 'sequelize'
    }
  };

  // Ajouter les chemins des migrations et seeders si fournis
  if (migrationsPath) {
    // Utiliser les propriétés standard de Sequelize CLI
    config.development.migrationPath = migrationsPath;
    config.development.migrationsPath = migrationsPath; // Propriété alternative
    config.development['migrations-path'] = migrationsPath; // Format avec tiret

    // Ajouter des options supplémentaires pour les migrations
    config.development.migrationStoragePath = './database.sqlite';
    config.development.migrationStorageTableName = 'sequelize_meta';

    // Ajouter le chemin des migrations à la configuration globale
    config.migrationPath = migrationsPath;
    config.migrationsPath = migrationsPath;
    config['migrations-path'] = migrationsPath;
  }

  if (seedersPath) {
    // Utiliser les propriétés standard de Sequelize CLI
    config.development.seederPath = seedersPath;
    config.development.seedersPath = seedersPath; // Propriété alternative
    config.development['seeders-path'] = seedersPath; // Format avec tiret

    // Ajouter des options supplémentaires pour les seeders
    config.development.seederStoragePath = './database.sqlite';
    config.development.seederStorageTableName = 'sequelize_data';

    // Ajouter le chemin des seeders à la configuration globale
    config.seederPath = seedersPath;
    config.seedersPath = seedersPath;
    config['seeders-path'] = seedersPath;
  }

  // Écrire le fichier de configuration
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));

  return configFilePath;
};

/**
 * Supprime un fichier de configuration temporaire
 *
 * @param {string} configFilePath - Chemin vers le fichier de configuration temporaire
 */
const removeTempSequelizeConfig = (configFilePath) => {
  if (fs.existsSync(configFilePath)) {
    fs.unlinkSync(configFilePath);
  }
};

module.exports = {
  createTempSequelizeConfig,
  removeTempSequelizeConfig
};
