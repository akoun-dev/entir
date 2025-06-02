'use strict';

/**
 * Routes pour la gestion des congés
 * 
 * Ce module définit les routes pour la gestion des congés dans le module HR.
 */

const express = require('express');
const { asyncHandler } = require('../../../src/server/core/routing/middlewares');
const { Leave, LeaveType, Employee } = require('../../../src/models');

// Créer un router Express
const router = express.Router();

/**
 * @route GET /hr/leaves
 * @description Récupère tous les congés
 * @access Public
 */
router.get('/', asyncHandler(async (req, res) => {
  const leaves = await Leave.findAll({
    include: [
      { model: Employee, as: 'employee' },
      { model: LeaveType, as: 'leaveType' }
    ],
    order: [['startDate', 'DESC']]
  });
  
  // Transformer les données pour correspondre au format attendu par le frontend
  const transformedLeaves = leaves.map(leave => ({
    id: leave.id.toString(),
    employee_id: leave.employeeId.toString(),
    employee_name: leave.employee ? leave.employee.name : null,
    date_from: leave.startDate.toISOString(),
    date_to: leave.endDate.toISOString(),
    number_of_days: leave.duration,
    state: leave.status,
    type: leave.leaveTypeId.toString(),
    type_name: leave.leaveType ? leave.leaveType.name : null,
    description: leave.description,
    created_at: leave.createdAt.toISOString(),
    updated_at: leave.updatedAt.toISOString()
  }));
  
  res.json(transformedLeaves);
}));

/**
 * @route GET /hr/leaves/:id
 * @description Récupère un congé par son ID
 * @access Public
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const leave = await Leave.findByPk(req.params.id, {
    include: [
      { model: Employee, as: 'employee' },
      { model: LeaveType, as: 'leaveType' }
    ]
  });
  
  if (!leave) {
    return res.status(404).json({
      message: 'Congé non trouvé'
    });
  }
  
  // Transformer les données pour correspondre au format attendu par le frontend
  const transformedLeave = {
    id: leave.id.toString(),
    employee_id: leave.employeeId.toString(),
    employee_name: leave.employee ? leave.employee.name : null,
    date_from: leave.startDate.toISOString(),
    date_to: leave.endDate.toISOString(),
    number_of_days: leave.duration,
    state: leave.status,
    type: leave.leaveTypeId.toString(),
    type_name: leave.leaveType ? leave.leaveType.name : null,
    description: leave.description,
    created_at: leave.createdAt.toISOString(),
    updated_at: leave.updatedAt.toISOString()
  };
  
  res.json(transformedLeave);
}));

/**
 * @route POST /hr/leaves
 * @description Crée une nouvelle demande de congé
 * @access Protected
 */
router.post('/', asyncHandler(async (req, res) => {
  const {
    employee_id,
    date_from,
    date_to,
    type,
    description
  } = req.body;
  
  // Vérifier les données requises
  if (!employee_id) {
    return res.status(400).json({
      message: 'L\'ID de l\'employé est requis'
    });
  }
  
  if (!date_from) {
    return res.status(400).json({
      message: 'La date de début est requise'
    });
  }
  
  if (!date_to) {
    return res.status(400).json({
      message: 'La date de fin est requise'
    });
  }
  
  if (!type) {
    return res.status(400).json({
      message: 'Le type de congé est requis'
    });
  }
  
  // Vérifier si l'employé existe
  const employee = await Employee.findByPk(employee_id);
  if (!employee) {
    return res.status(404).json({
      message: 'Employé non trouvé'
    });
  }
  
  // Vérifier si le type de congé existe
  const leaveType = await LeaveType.findByPk(type);
  if (!leaveType) {
    return res.status(404).json({
      message: 'Type de congé non trouvé'
    });
  }
  
  // Calculer la durée du congé (en jours)
  const startDate = new Date(date_from);
  const endDate = new Date(date_to);
  const diffTime = Math.abs(endDate - startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 pour inclure le jour de fin
  
  // Créer la demande de congé
  const leave = await Leave.create({
    employeeId: employee_id,
    startDate: date_from,
    endDate: date_to,
    duration: diffDays,
    status: 'draft', // Statut initial
    leaveTypeId: type,
    description
  });
  
  // Transformer les données pour correspondre au format attendu par le frontend
  const transformedLeave = {
    id: leave.id.toString(),
    employee_id: leave.employeeId.toString(),
    employee_name: employee.name,
    date_from: leave.startDate.toISOString(),
    date_to: leave.endDate.toISOString(),
    number_of_days: leave.duration,
    state: leave.status,
    type: leave.leaveTypeId.toString(),
    type_name: leaveType.name,
    description: leave.description,
    created_at: leave.createdAt.toISOString(),
    updated_at: leave.updatedAt.toISOString()
  };
  
  res.status(201).json(transformedLeave);
}));

/**
 * @route PUT /hr/leaves/:id/status
 * @description Met à jour le statut d'un congé
 * @access Protected
 */
router.put('/:id/status', asyncHandler(async (req, res) => {
  const leave = await Leave.findByPk(req.params.id, {
    include: [
      { model: Employee, as: 'employee' },
      { model: LeaveType, as: 'leaveType' }
    ]
  });
  
  if (!leave) {
    return res.status(404).json({
      message: 'Congé non trouvé'
    });
  }
  
  const { status, comment } = req.body;
  
  // Vérifier que le statut est valide
  const validStatuses = ['draft', 'submitted', 'approved', 'refused', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: 'Statut invalide'
    });
  }
  
  // Mettre à jour le statut
  leave.status = status;
  
  // Ajouter un commentaire si fourni
  if (comment) {
    leave.comment = comment;
  }
  
  // Sauvegarder les modifications
  await leave.save();
  
  // Transformer les données pour correspondre au format attendu par le frontend
  const transformedLeave = {
    id: leave.id.toString(),
    employee_id: leave.employeeId.toString(),
    employee_name: leave.employee ? leave.employee.name : null,
    date_from: leave.startDate.toISOString(),
    date_to: leave.endDate.toISOString(),
    number_of_days: leave.duration,
    state: leave.status,
    type: leave.leaveTypeId.toString(),
    type_name: leave.leaveType ? leave.leaveType.name : null,
    description: leave.description,
    created_at: leave.createdAt.toISOString(),
    updated_at: leave.updatedAt.toISOString()
  };
  
  res.json(transformedLeave);
}));

/**
 * @route DELETE /hr/leaves/:id
 * @description Supprime un congé
 * @access Protected
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const leave = await Leave.findByPk(req.params.id);
  
  if (!leave) {
    return res.status(404).json({
      message: 'Congé non trouvé'
    });
  }
  
  // Vérifier si le congé peut être supprimé (seulement les congés en brouillon ou annulés)
  if (leave.status !== 'draft' && leave.status !== 'cancelled') {
    return res.status(400).json({
      message: 'Seuls les congés en brouillon ou annulés peuvent être supprimés'
    });
  }
  
  await leave.destroy();
  
  res.json({
    success: true,
    message: 'Congé supprimé avec succès'
  });
}));

module.exports = router;
