import { useState, useEffect, useCallback } from 'react';
import { Leave, LeaveType, LeaveRequest, LeaveBalance } from '../types';
import { leaveService } from '../services';

/**
 * Hook pour gérer les congés
 * 
 * Ce hook fournit des fonctionnalités pour gérer les congés, les types de congés
 * et les soldes de congés dans le module RH.
 */
export const useLeaves = () => {
  // États pour les congés
  const [leavesList, setLeavesList] = useState<Leave[]>([]);
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // États pour les types de congés
  const [leaveTypes, setLeaveTypes] = useState<LeaveType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [typesError, setTypesError] = useState<string | null>(null);
  
  // États pour les soldes de congés
  const [leaveBalances, setLeaveBalances] = useState<Record<string, LeaveBalance[]>>({});
  const [loadingBalances, setLoadingBalances] = useState(false);
  const [balancesError, setBalancesError] = useState<string | null>(null);
  
  /**
   * Récupère tous les congés
   */
  const getAllLeaves = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const leaves = await leaveService.getAll();
      setLeavesList(leaves);
      
      return leaves;
    } catch (err) {
      console.error('Erreur lors du chargement des congés:', err);
      setError('Impossible de charger la liste des congés.');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Récupère un congé par son ID
   * @param id ID du congé
   */
  const getLeaveById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const leave = await leaveService.getById(id);
      setSelectedLeave(leave);
      
      return leave;
    } catch (err) {
      console.error(`Erreur lors du chargement du congé ${id}:`, err);
      setError(`Impossible de charger le congé ${id}.`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Récupère les congés d'un employé
   * @param employeeId ID de l'employé
   */
  const getEmployeeLeaves = useCallback(async (employeeId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const leaves = await leaveService.getByEmployee(employeeId);
      
      // Mettre à jour la liste des congés avec les congés de l'employé
      setLeavesList(prevLeaves => {
        const otherLeaves = prevLeaves.filter(leave => leave.employee_id !== employeeId);
        return [...otherLeaves, ...leaves];
      });
      
      return leaves;
    } catch (err) {
      console.error(`Erreur lors du chargement des congés de l'employé ${employeeId}:`, err);
      setError(`Impossible de charger les congés de l'employé ${employeeId}.`);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Crée une demande de congé
   * @param leaveRequest Données de la demande de congé
   */
  const createLeaveRequest = useCallback(async (leaveRequest: LeaveRequest) => {
    try {
      setLoading(true);
      setError(null);
      
      const newLeave = await leaveService.create(leaveRequest);
      
      // Ajouter le nouveau congé à la liste
      setLeavesList(prevLeaves => [...prevLeaves, newLeave]);
      
      return newLeave;
    } catch (err) {
      console.error('Erreur lors de la création de la demande de congé:', err);
      setError('Impossible de créer la demande de congé.');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  
  /**
   * Met à jour le statut d'un congé
   * @param id ID du congé
   * @param status Nouveau statut
   * @param comment Commentaire optionnel
   */
  const updateLeaveStatus = useCallback(async (
    id: string,
    status: 'draft' | 'submitted' | 'approved' | 'refused' | 'cancelled',
    comment?: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      
      const updatedLeave = await leaveService.updateStatus(id, status, comment);
      
      // Mettre à jour la liste des congés
      setLeavesList(prevLeaves => 
        prevLeaves.map(leave => leave.id === id ? updatedLeave : leave)
      );
      
      // Mettre à jour le congé sélectionné si nécessaire
      if (selectedLeave && selectedLeave.id === id) {
        setSelectedLeave(updatedLeave);
      }
      
      return updatedLeave;
    } catch (err) {
      console.error(`Erreur lors de la mise à jour du statut du congé ${id}:`, err);
      setError(`Impossible de mettre à jour le statut du congé ${id}.`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [selectedLeave]);
  
  /**
   * Supprime un congé
   * @param id ID du congé
   */
  const deleteLeave = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await leaveService.delete(id);
      
      if (result.success) {
        // Supprimer le congé de la liste
        setLeavesList(prevLeaves => prevLeaves.filter(leave => leave.id !== id));
        
        // Réinitialiser le congé sélectionné si nécessaire
        if (selectedLeave && selectedLeave.id === id) {
          setSelectedLeave(null);
        }
      }
      
      return result.success;
    } catch (err) {
      console.error(`Erreur lors de la suppression du congé ${id}:`, err);
      setError(`Impossible de supprimer le congé ${id}.`);
      return false;
    } finally {
      setLoading(false);
    }
  }, [selectedLeave]);
  
  /**
   * Récupère tous les types de congés
   */
  const loadLeaveTypes = useCallback(async () => {
    try {
      setLoadingTypes(true);
      setTypesError(null);
      
      const types = await leaveService.getLeaveTypes();
      setLeaveTypes(types);
      
      return types;
    } catch (err) {
      console.error('Erreur lors du chargement des types de congés:', err);
      setTypesError('Impossible de charger les types de congés.');
      return [];
    } finally {
      setLoadingTypes(false);
    }
  }, []);
  
  /**
   * Récupère les types de congés (ou utilise les données en cache)
   */
  const getLeaveTypes = useCallback(() => {
    // Si les types de congés ne sont pas encore chargés, les charger
    if (leaveTypes.length === 0 && !loadingTypes) {
      loadLeaveTypes();
    }
    
    // En attendant, retourner des données simulées
    if (leaveTypes.length === 0) {
      return [
        {
          id: "1",
          name: "Congés payés",
          code: "CP",
          color: "#10B981", // Emerald
          requires_approval: true,
          active: true
        },
        {
          id: "2",
          name: "RTT",
          code: "RTT",
          color: "#3B82F6", // Blue
          requires_approval: true,
          active: true
        },
        {
          id: "3",
          name: "Congé maladie",
          code: "CM",
          color: "#F59E0B", // Amber
          requires_approval: false,
          active: true
        },
        {
          id: "4",
          name: "Congé sans solde",
          code: "CSS",
          color: "#6366F1", // Indigo
          requires_approval: true,
          active: true
        }
      ];
    }
    
    return leaveTypes;
  }, [leaveTypes, loadingTypes, loadLeaveTypes]);
  
  /**
   * Récupère les soldes de congés d'un employé
   * @param employeeId ID de l'employé
   */
  const loadEmployeeLeaveBalances = useCallback(async (employeeId: string) => {
    try {
      setLoadingBalances(true);
      setBalancesError(null);
      
      const balances = await leaveService.getLeaveBalances(employeeId);
      
      // Mettre à jour les soldes de congés
      setLeaveBalances(prevBalances => ({
        ...prevBalances,
        [employeeId]: balances
      }));
      
      return balances;
    } catch (err) {
      console.error(`Erreur lors du chargement des soldes de congés de l'employé ${employeeId}:`, err);
      setBalancesError(`Impossible de charger les soldes de congés de l'employé ${employeeId}.`);
      return [];
    } finally {
      setLoadingBalances(false);
    }
  }, []);
  
  /**
   * Récupère les soldes de congés d'un employé (ou utilise les données en cache)
   * @param employeeId ID de l'employé
   */
  const getEmployeeLeaveBalances = useCallback((employeeId: string) => {
    // Si les soldes de congés de l'employé ne sont pas encore chargés, les charger
    if (!leaveBalances[employeeId] && !loadingBalances) {
      loadEmployeeLeaveBalances(employeeId);
    }
    
    // En attendant, retourner des données simulées
    if (!leaveBalances[employeeId]) {
      return [
        {
          id: "1",
          employee_id: employeeId,
          leave_type_id: "1",
          leave_type_name: "Congés payés",
          total_allocated: 25,
          total_taken: 12,
          remaining: 13,
          year: new Date().getFullYear()
        },
        {
          id: "2",
          employee_id: employeeId,
          leave_type_id: "2",
          leave_type_name: "RTT",
          total_allocated: 12,
          total_taken: 5,
          remaining: 7,
          year: new Date().getFullYear()
        },
        {
          id: "3",
          employee_id: employeeId,
          leave_type_id: "3",
          leave_type_name: "Congé maladie",
          total_allocated: 0,
          total_taken: 3,
          remaining: 0,
          year: new Date().getFullYear()
        }
      ];
    }
    
    return leaveBalances[employeeId];
  }, [leaveBalances, loadingBalances, loadEmployeeLeaveBalances]);
  
  /**
   * Alloue des jours de congés à un employé
   * @param employeeId ID de l'employé
   * @param leaveTypeId ID du type de congé
   * @param days Nombre de jours à allouer
   * @param year Année concernée
   */
  const allocateLeaves = useCallback(async (
    employeeId: string,
    leaveTypeId: string,
    days: number,
    year: number = new Date().getFullYear()
  ) => {
    try {
      setLoadingBalances(true);
      setBalancesError(null);
      
      const updatedBalance = await leaveService.allocateLeaves(employeeId, leaveTypeId, days, year);
      
      // Mettre à jour les soldes de congés
      setLeaveBalances(prevBalances => {
        const employeeBalances = prevBalances[employeeId] || [];
        const otherBalances = employeeBalances.filter(balance => 
          balance.leave_type_id !== leaveTypeId || balance.year !== year
        );
        
        return {
          ...prevBalances,
          [employeeId]: [...otherBalances, updatedBalance]
        };
      });
      
      return updatedBalance;
    } catch (err) {
      console.error(`Erreur lors de l'allocation de congés à l'employé ${employeeId}:`, err);
      setBalancesError(`Impossible d'allouer des congés à l'employé ${employeeId}.`);
      return null;
    } finally {
      setLoadingBalances(false);
    }
  }, []);
  
  // Charger les données initiales
  useEffect(() => {
    getAllLeaves();
    loadLeaveTypes();
  }, [getAllLeaves, loadLeaveTypes]);
  
  return {
    // Données
    leavesList,
    selectedLeave,
    leaveTypes,
    leaveBalances,
    
    // États de chargement
    loading,
    loadingTypes,
    loadingBalances,
    
    // Erreurs
    error,
    typesError,
    balancesError,
    
    // Méthodes pour les congés
    getAllLeaves,
    getLeaveById,
    getEmployeeLeaves,
    createLeaveRequest,
    updateLeaveStatus,
    deleteLeave,
    setSelectedLeave,
    
    // Méthodes pour les types de congés
    loadLeaveTypes,
    getLeaveTypes,
    
    // Méthodes pour les soldes de congés
    loadEmployeeLeaveBalances,
    getEmployeeLeaveBalances,
    allocateLeaves
  };
};

export default useLeaves;
