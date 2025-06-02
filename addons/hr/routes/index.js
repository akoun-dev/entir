'use strict';

/**
 * Routes principales du module HR
 * 
 * Ce module exporte un router Express qui regroupe toutes les routes du module HR.
 */

const express = require('express');
const employeesRoutes = require('./employees');
const departmentsRoutes = require('./departments');
const leavesRoutes = require('./leaves');

// Créer un router Express
const router = express.Router();

// Monter les routes des employés
router.use('/employees', employeesRoutes);

// Monter les routes des départements
router.use('/departments', departmentsRoutes);

// Monter les routes des congés
router.use('/leaves', leavesRoutes);

// Route racine du module HR
router.get('/', (req, res) => {
  res.json({
    message: 'API du module Ressources Humaines',
    version: '1.0.0',
    endpoints: [
      {
        path: '/hr/employees',
        description: 'Gestion des employés'
      },
      {
        path: '/hr/departments',
        description: 'Gestion des départements'
      },
      {
        path: '/hr/leaves',
        description: 'Gestion des congés'
      }
    ]
  });
});

module.exports = router;
