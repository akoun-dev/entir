'use strict';

const { sequelize } = require('./models');
const { exec } = require('child_process');
const path = require('path');

/**
 * Script pour initialiser la base de données
 * Exécute les migrations et les seeds
 */
async function setupDatabase() {
  try {
    console.log('Démarrage de l\'initialisation de la base de données...');
    
    // Vérifier la connexion à la base de données
    try {
      await sequelize.authenticate();
      console.log('Connexion à la base de données établie avec succès.');
    } catch (error) {
      console.error('Impossible de se connecter à la base de données:', error);
      process.exit(1);
    }
    
    // Exécuter les migrations
    console.log('Exécution des migrations...');
    await new Promise((resolve, reject) => {
      exec('npx sequelize-cli db:migrate --migrations-path=src/migrations', (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur lors de l'exécution des migrations: ${error.message}`);
          return reject(error);
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        resolve();
      });
    });
    
    // Exécuter les seeds
    console.log('Exécution des seeds...');
    await new Promise((resolve, reject) => {
      exec('npx sequelize-cli db:seed:all --seeders-path=src/seeders', (error, stdout, stderr) => {
        if (error) {
          console.error(`Erreur lors de l'exécution des seeds: ${error.message}`);
          return reject(error);
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        resolve();
      });
    });
    
    console.log('Initialisation de la base de données terminée avec succès!');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
}

// Exécuter la fonction d'initialisation
setupDatabase();
