'use strict';

/**
 * Routes pour la gestion des départements
 * 
 * Ce module définit les routes pour la gestion des départements dans le module HR.
 */

const express = require('express');
const { asyncHandler } = require('../../../src/server/core/routing/middlewares');
const { Department, Employee } = require('../../../src/models');

// Créer un router Express
const router = express.Router();

/**
 * @route GET /hr/departments
 * @description Récupère tous les départements
 * @access Public
 */
router.get('/', asyncHandler(async (req, res) => {
  const departments = await Department.findAll({
    order: [['name', 'ASC']]
  });
  
  res.json(departments);
}));

/**
 * @route GET /hr/departments/:id
 * @description Récupère un département par son ID
 * @access Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  
  if (!department) {
    return res.status(404).json({
      message: 'Département non trouvé'
    });
  }
  
  res.json(department);
}));

/**
 * @route POST /hr/departments
 * @description Crée un nouveau département
 * @access Protected
 */
router.post('/', asyncHandler(async (req, res) => {
  const {
    name,
    code,
    description,
    manager_id,
    parent_id,
    active
  } = req.body;
  
  // Vérifier les données requises
  if (!name) {
    return res.status(400).json({
      message: 'Le nom est requis'
    });
  }
  
  if (!code) {
    return res.status(400).json({
      message: 'Le code est requis'
    });
  }
  
  // Vérifier si le code est unique
  const existingDepartment = await Department.findOne({
    where: { code }
  });
  
  if (existingDepartment) {
    return res.status(400).json({
      message: 'Ce code de département existe déjà'
    });
  }
  
  // Créer le département
  const department = await Department.create({
    name,
    code,
    description,
    managerId: manager_id,
    parentId: parent_id,
    active: active !== undefined ? active : true
  });
  
  res.status(201).json(department);
}));

/**
 * @route PUT /hr/departments/:id
 * @description Met à jour un département existant
 * @access Protected
 */
router.put('/:id', asyncHandler(async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  
  if (!department) {
    return res.status(404).json({
      message: 'Département non trouvé'
    });
  }
  
  const {
    name,
    code,
    description,
    manager_id,
    parent_id,
    active
  } = req.body;
  
  // Vérifier si le code est unique (si modifié)
  if (code && code !== department.code) {
    const existingDepartment = await Department.findOne({
      where: { code }
    });
    
    if (existingDepartment) {
      return res.status(400).json({
        message: 'Ce code de département existe déjà'
      });
    }
  }
  
  // Mettre à jour les champs
  if (name !== undefined) department.name = name;
  if (code !== undefined) department.code = code;
  if (description !== undefined) department.description = description;
  if (manager_id !== undefined) department.managerId = manager_id;
  if (parent_id !== undefined) department.parentId = parent_id;
  if (active !== undefined) department.active = active;
  
  // Sauvegarder les modifications
  await department.save();
  
  res.json(department);
}));

/**
 * @route DELETE /hr/departments/:id
 * @description Supprime un département
 * @access Protected
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  
  if (!department) {
    return res.status(404).json({
      message: 'Département non trouvé'
    });
  }
  
  // Vérifier si le département a des employés
  const employeeCount = await Employee.count({
    where: { departmentId: req.params.id }
  });
  
  if (employeeCount > 0) {
    return res.status(400).json({
      message: 'Impossible de supprimer un département qui contient des employés'
    });
  }
  
  // Vérifier si le département a des sous-départements
  const subDepartmentCount = await Department.count({
    where: { parentId: req.params.id }
  });
  
  if (subDepartmentCount > 0) {
    return res.status(400).json({
      message: 'Impossible de supprimer un département qui contient des sous-départements'
    });
  }
  
  await department.destroy();
  
  res.json({
    success: true,
    message: 'Département supprimé avec succès'
  });
}));

/**
 * @route GET /hr/departments/:id/employees
 * @description Récupère les employés d'un département
 * @access Public
 */
router.get('/:id/employees', asyncHandler(async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  
  if (!department) {
    return res.status(404).json({
      message: 'Département non trouvé'
    });
  }
  
  const employees = await Employee.findAll({
    where: { departmentId: req.params.id },
    order: [['name', 'ASC']]
  });
  
  res.json(employees);
}));

/**
 * @route GET /hr/departments/:id/subdepartments
 * @description Récupère les sous-départements d'un département
 * @access Public
 */
router.get('/:id/subdepartments', asyncHandler(async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  
  if (!department) {
    return res.status(404).json({
      message: 'Département non trouvé'
    });
  }
  
  const subDepartments = await Department.findAll({
    where: { parentId: req.params.id },
    order: [['name', 'ASC']]
  });
  
  res.json(subDepartments);
}));

module.exports = router;
