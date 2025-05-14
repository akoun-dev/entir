'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

/**
 * Exécute les migrations d'un module
 *
 * @param {string} migrationsPath - Chemin vers le dossier des migrations
 * @returns {Promise<void>}
 */
const runMigrations = async (migrationsPath) => {
  console.log(`Exécution des migrations depuis ${migrationsPath}`);

  // Vérifier si le dossier des migrations existe
  if (!fs.existsSync(migrationsPath)) {
    console.error(`Le dossier des migrations n'existe pas: ${migrationsPath}`);
    throw new Error(`Le dossier des migrations n'existe pas: ${migrationsPath}`);
  }

  // Vérifier si le dossier des migrations contient des fichiers
  const migrationFiles = fs.readdirSync(migrationsPath);
  if (migrationFiles.length === 0) {
    console.log(`Aucun fichier de migration trouvé dans ${migrationsPath}`);
    return;
  }

  console.log(`Fichiers de migration trouvés: ${migrationFiles.join(', ')}`);

  // Créer une instance Sequelize
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: console.log
  });

  // Créer la table pour stocker les migrations exécutées si elle n'existe pas
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`SequelizeMeta\` (
      \`name\` VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY
    )
  `);

  // Récupérer les migrations déjà exécutées
  const executedMigrations = await sequelize.query(
    'SELECT `name` FROM `SequelizeMeta`',
    {
      type: Sequelize.QueryTypes.SELECT
    }
  );

  const executedMigrationNames = executedMigrations ? executedMigrations.map(m => m.name) : [];
  console.log(`Migrations déjà exécutées: ${executedMigrationNames.join(', ') || 'aucune'}`);

  // Vérifier si les tables du module HR existent déjà
  const tables = await sequelize.query(
    "SELECT name FROM sqlite_master WHERE type='table' AND name LIKE 'hr_%'",
    {
      type: Sequelize.QueryTypes.SELECT
    }
  );

  const existingTables = tables ? tables.map(t => t.name) : [];
  console.log(`Tables HR existantes: ${existingTables.join(', ') || 'aucune'}`);

  // Si les tables existent déjà, ne pas exécuter les migrations
  if (existingTables.length > 0) {
    console.log('Les tables du module HR existent déjà, les migrations seront ignorées.');

    // Enregistrer les migrations dans la table SequelizeMeta si elles n'y sont pas déjà
    const migrationFiles = [
      '20250601000001-create-hr-department.js',
      '20250601000002-create-hr-position.js',
      '20250601000003-create-hr-employee.js',
      '20250601000004-create-hr-leave-type.js',
      '20250601000005-create-hr-leave.js',
      '20250601000006-create-hr-contract.js'
    ];

    for (const migrationFile of migrationFiles) {
      if (!executedMigrationNames.includes(migrationFile)) {
        await sequelize.query(
          'INSERT INTO `SequelizeMeta` (`name`) VALUES (?)',
          {
            replacements: [migrationFile],
            type: Sequelize.QueryTypes.INSERT
          }
        );
        console.log(`Migration enregistrée: ${migrationFile}`);
      }
    }

    return;
  }

  try {
    console.log('Création des tables du module HR...');

    // Création de la table hr_departments
    console.log('Création de la table hr_departments...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS hr_departments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        active BOOLEAN DEFAULT 1,
        budget DECIMAL(15, 2),
        costCenter VARCHAR(255),
        parentId INTEGER REFERENCES hr_departments(id) ON UPDATE CASCADE ON DELETE SET NULL,
        managerId INTEGER,
        createdBy INTEGER,
        updatedBy INTEGER,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
      )
    `);

    // Création des index pour hr_departments
    await sequelize.query(`CREATE UNIQUE INDEX IF NOT EXISTS department_code_idx ON hr_departments (code)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS department_name_idx ON hr_departments (name)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS department_active_idx ON hr_departments (active)`);

    // Création de la table hr_positions
    console.log('Création de la table hr_positions...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS hr_positions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        active BOOLEAN DEFAULT 1,
        departmentId INTEGER REFERENCES hr_departments(id) ON UPDATE CASCADE ON DELETE SET NULL,
        createdBy INTEGER,
        updatedBy INTEGER,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
      )
    `);

    // Création des index pour hr_positions
    await sequelize.query(`CREATE UNIQUE INDEX IF NOT EXISTS position_code_idx ON hr_positions (code)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS position_name_idx ON hr_positions (name)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS position_active_idx ON hr_positions (active)`);

    // Création de la table hr_employees
    console.log('Création de la table hr_employees...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS hr_employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE,
        phone VARCHAR(255),
        address TEXT,
        birthDate DATE,
        hireDate DATE,
        departmentId INTEGER REFERENCES hr_departments(id) ON UPDATE CASCADE ON DELETE SET NULL,
        positionId INTEGER REFERENCES hr_positions(id) ON UPDATE CASCADE ON DELETE SET NULL,
        managerId INTEGER REFERENCES hr_employees(id) ON UPDATE CASCADE ON DELETE SET NULL,
        userId INTEGER,
        active BOOLEAN DEFAULT 1,
        createdBy INTEGER,
        updatedBy INTEGER,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
      )
    `);

    // Création des index pour hr_employees
    await sequelize.query(`CREATE INDEX IF NOT EXISTS employee_name_idx ON hr_employees (lastName, firstName)`);
    await sequelize.query(`CREATE UNIQUE INDEX IF NOT EXISTS employee_email_idx ON hr_employees (email)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS employee_active_idx ON hr_employees (active)`);

    // Création de la table hr_leave_types
    console.log('Création de la table hr_leave_types...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS hr_leave_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        paid BOOLEAN DEFAULT 1,
        allowedDays INTEGER,
        requiresApproval BOOLEAN DEFAULT 1,
        active BOOLEAN DEFAULT 1,
        createdBy INTEGER,
        updatedBy INTEGER,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
      )
    `);

    // Création des index pour hr_leave_types
    await sequelize.query(`CREATE UNIQUE INDEX IF NOT EXISTS leave_type_code_idx ON hr_leave_types (code)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS leave_type_name_idx ON hr_leave_types (name)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS leave_type_active_idx ON hr_leave_types (active)`);

    // Création de la table hr_leaves
    console.log('Création de la table hr_leaves...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS hr_leaves (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employeeId INTEGER NOT NULL REFERENCES hr_employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
        leaveTypeId INTEGER NOT NULL REFERENCES hr_leave_types(id) ON UPDATE CASCADE ON DELETE CASCADE,
        startDate DATE NOT NULL,
        endDate DATE NOT NULL,
        days DECIMAL(5, 2) NOT NULL,
        reason TEXT,
        status VARCHAR(255) DEFAULT 'pending',
        approvedBy INTEGER REFERENCES hr_employees(id) ON UPDATE CASCADE ON DELETE SET NULL,
        approvedAt DATETIME,
        createdBy INTEGER,
        updatedBy INTEGER,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
      )
    `);

    // Création des index pour hr_leaves
    await sequelize.query(`CREATE INDEX IF NOT EXISTS leave_employee_idx ON hr_leaves (employeeId)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS leave_type_idx ON hr_leaves (leaveTypeId)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS leave_status_idx ON hr_leaves (status)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS leave_date_idx ON hr_leaves (startDate, endDate)`);

    // Création de la table hr_contracts
    console.log('Création de la table hr_contracts...');
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS hr_contracts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employeeId INTEGER NOT NULL REFERENCES hr_employees(id) ON UPDATE CASCADE ON DELETE CASCADE,
        type VARCHAR(255) NOT NULL,
        startDate DATE NOT NULL,
        endDate DATE,
        salary DECIMAL(15, 2),
        currency VARCHAR(3),
        workingHours DECIMAL(5, 2),
        trialPeriod INTEGER,
        notes TEXT,
        status VARCHAR(255) DEFAULT 'active',
        createdBy INTEGER,
        updatedBy INTEGER,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
      )
    `);

    // Création des index pour hr_contracts
    await sequelize.query(`CREATE INDEX IF NOT EXISTS contract_employee_idx ON hr_contracts (employeeId)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS contract_type_idx ON hr_contracts (type)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS contract_status_idx ON hr_contracts (status)`);
    await sequelize.query(`CREATE INDEX IF NOT EXISTS contract_date_idx ON hr_contracts (startDate, endDate)`);

    // Enregistrer les migrations dans la table SequelizeMeta
    const migrationFilesToRegister = [
      '20250601000001-create-hr-department.js',
      '20250601000002-create-hr-position.js',
      '20250601000003-create-hr-employee.js',
      '20250601000004-create-hr-leave-type.js',
      '20250601000005-create-hr-leave.js',
      '20250601000006-create-hr-contract.js'
    ];

    for (const migrationFile of migrationFilesToRegister) {
      try {
        await sequelize.query(
          'INSERT INTO `SequelizeMeta` (`name`) VALUES (?)',
          {
            replacements: [migrationFile],
            type: Sequelize.QueryTypes.INSERT
          }
        );
        console.log(`Migration enregistrée: ${migrationFile}`);
      } catch (error) {
        // Ignorer les erreurs de duplication
        if (!error.message.includes('UNIQUE constraint failed')) {
          throw error;
        }
      }
    }

    console.log('Toutes les tables du module HR ont été créées avec succès.');
  } catch (error) {
    console.error(`Erreur lors de la création des tables du module HR: ${error.message}`);
    throw error;
  }
};

/**
 * Exécute les seeders d'un module
 *
 * @param {string} seedersPath - Chemin vers le dossier des seeders
 * @returns {Promise<void>}
 */
const runSeeders = async (seedersPath) => {
  console.log(`Exécution des seeders depuis ${seedersPath}`);

  // Vérifier si le dossier des seeders existe
  if (!fs.existsSync(seedersPath)) {
    console.error(`Le dossier des seeders n'existe pas: ${seedersPath}`);
    throw new Error(`Le dossier des seeders n'existe pas: ${seedersPath}`);
  }

  // Vérifier si le dossier des seeders contient des fichiers
  const seederFiles = fs.readdirSync(seedersPath);
  if (seederFiles.length === 0) {
    console.log(`Aucun fichier de seeder trouvé dans ${seedersPath}`);
    return;
  }

  console.log(`Fichiers de seeder trouvés: ${seederFiles.join(', ')}`);

  // Créer une instance Sequelize
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: console.log
  });

  // Obtenir l'interface de requête
  const queryInterface = sequelize.getQueryInterface();

  // Créer la table pour stocker les seeders exécutés si elle n'existe pas
  await sequelize.query(`
    CREATE TABLE IF NOT EXISTS \`sequelize_data\` (
      \`name\` VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY
    )
  `);

  // Exécuter les seeders manuellement
  for (const seederFile of seederFiles.sort()) {
    try {
      console.log(`Exécution du seeder: ${seederFile}`);

      // Vérifier si le seeder a déjà été exécuté
      const [results] = await sequelize.query(
        'SELECT * FROM `sequelize_data` WHERE `name` = ?',
        {
          replacements: [seederFile],
          type: Sequelize.QueryTypes.SELECT
        }
      );

      if (results && results.length > 0) {
        console.log(`Le seeder ${seederFile} a déjà été exécuté, il sera ignoré.`);
        continue;
      }

      // Charger le fichier de seeder
      const seederPath = path.join(seedersPath, seederFile);
      const seeder = require(seederPath);

      // Exécuter le seeder
      await seeder.up(queryInterface, Sequelize);

      // Enregistrer le seeder dans la table sequelize_data
      await sequelize.query(
        'INSERT INTO `sequelize_data` (`name`) VALUES (?)',
        {
          replacements: [seederFile],
          type: Sequelize.QueryTypes.INSERT
        }
      );

      console.log(`Seeder exécuté avec succès: ${seederFile}`);
    } catch (error) {
      console.error(`Erreur lors de l'exécution du seeder ${seederFile}: ${error.message}`);
      // Ne pas interrompre l'exécution des autres seeders en cas d'erreur
      console.error(`L'erreur sera ignorée et l'exécution des autres seeders continuera.`);
    }
  }
};

module.exports = {
  runMigrations,
  runSeeders
};
