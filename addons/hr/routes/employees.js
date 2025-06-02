'use strict';

/**
 * Routes pour la gestion des employés
 * 
 * Ce module définit les routes pour la gestion des employés dans le module HR.
 */

const express = require('express');
const { asyncHandler } = require('../../../src/server/core/routing/middlewares');
const { Employee } = require('../../../src/models');

// Créer un router Express
const router = express.Router();

/**
 * @route GET /hr/employees
 * @description Récupère tous les employés
 * @access Public
 */
router.get('/', asyncHandler(async (req, res) => {
  const employees = await Employee.findAll({
    order: [['name', 'ASC']]
  });
  
  res.json(employees);
}));

/**
 * @route GET /hr/employees/:id
 * @description Récupère un employé par son ID
 * @access Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  
  if (!employee) {
    return res.status(404).json({
      message: 'Employé non trouvé'
    });
  }
  
  res.json(employee);
}));

/**
 * @route POST /hr/employees
 * @description Crée un nouvel employé
 * @access Protected
 */
router.post('/', asyncHandler(async (req, res) => {
  const {
    name,
    job_title,
    department_id,
    work_email,
    work_phone,
    manager_id,
    is_active,
    photo,
    notes,
    address
  } = req.body;
  
  // Vérifier les données requises
  if (!name) {
    return res.status(400).json({
      message: 'Le nom est requis'
    });
  }
  
  // Créer l'employé
  const employee = await Employee.create({
    name,
    job_title,
    departmentId: department_id,
    work_email,
    work_phone,
    managerId: manager_id,
    active: is_active !== undefined ? is_active : true,
    photo,
    notes,
    address
  });
  
  res.status(201).json(employee);
}));

/**
 * @route PUT /hr/employees/:id
 * @description Met à jour un employé existant
 * @access Protected
 */
router.put('/:id', asyncHandler(async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  
  if (!employee) {
    return res.status(404).json({
      message: 'Employé non trouvé'
    });
  }
  
  const {
    name,
    job_title,
    department_id,
    work_email,
    work_phone,
    manager_id,
    is_active,
    photo,
    notes,
    address
  } = req.body;
  
  // Mettre à jour les champs
  if (name !== undefined) employee.name = name;
  if (job_title !== undefined) employee.job_title = job_title;
  if (department_id !== undefined) employee.departmentId = department_id;
  if (work_email !== undefined) employee.work_email = work_email;
  if (work_phone !== undefined) employee.work_phone = work_phone;
  if (manager_id !== undefined) employee.managerId = manager_id;
  if (is_active !== undefined) employee.active = is_active;
  if (photo !== undefined) employee.photo = photo;
  if (notes !== undefined) employee.notes = notes;
  if (address !== undefined) employee.address = address;
  
  // Sauvegarder les modifications
  await employee.save();
  
  res.json(employee);
}));

/**
 * @route DELETE /hr/employees/:id
 * @description Supprime un employé
 * @access Protected
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const employee = await Employee.findByPk(req.params.id);
  
  if (!employee) {
    return res.status(404).json({
      message: 'Employé non trouvé'
    });
  }
  
  await employee.destroy();
  
  res.json({
    success: true,
    message: 'Employé supprimé avec succès'
  });
}));

/**
 * @route GET /hr/employees/manager/:managerId
 * @description Récupère les employés sous la responsabilité d'un manager
 * @access Public
 */
router.get('/manager/:managerId', asyncHandler(async (req, res) => {
  const employees = await Employee.findAll({
    where: {
      managerId: req.params.managerId
    },
    order: [['name', 'ASC']]
  });
  
  res.json(employees);
}));

module.exports = router;
