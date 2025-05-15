
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { leaves, leaveTypes, leaveBalances } from '../data/leaves';
import { Leave, LeaveType, LeaveRequest, LeaveBalance } from '../types';

export const useLeaves = () => {
  const [leavesList, setLeavesList] = useState<Leave[]>(leaves);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer tous les congés
  const getAllLeaves = () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simuler un délai de chargement
      setTimeout(() => {
        setLeavesList(leaves);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Erreur lors du chargement des congés');
      setLoading(false);
    }
  };

  // Fonction pour récupérer les congés d'un employé
  const getEmployeeLeaves = (employeeId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simuler un délai de chargement
      setTimeout(() => {
        const filteredLeaves = leaves.filter(leave => leave.employee_id === employeeId);
        setLeavesList(filteredLeaves);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Erreur lors du chargement des congés');
      setLoading(false);
    }
  };

  // Fonction pour créer une demande de congé
  const createLeaveRequest = (leaveRequest: LeaveRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      // Générer un nouvel ID (dans une vraie application, cela serait fait côté serveur)
      const newId = (Math.max(...leavesList.map(leave => parseInt(leave.id))) + 1).toString();
      
      // Calculer le nombre de jours (simplifié)
      const startDate = new Date(leaveRequest.date_from);
      const endDate = new Date(leaveRequest.date_to);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      
      // Trouver le type de congé
      const leaveType = leaveTypes.find(type => type.id === leaveRequest.type);
      
      // Créer le nouvel objet de congé
      const newLeave: Leave = {
        id: newId,
        employee_id: leaveRequest.employee_id,
        date_from: leaveRequest.date_from,
        date_to: leaveRequest.date_to,
        number_of_days: diffDays,
        state: 'submitted',
        type: leaveRequest.type,
        type_name: leaveType?.name,
        description: leaveRequest.description,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Ajouter le congé à la liste
      setTimeout(() => {
        setLeavesList([...leavesList, newLeave]);
        setLoading(false);
        toast({
          title: "Demande créée",
          description: "Votre demande de congé a été soumise avec succès."
        });
      }, 500);
    } catch (err) {
      setError('Erreur lors de la création de la demande');
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer la demande de congé."
      });
    }
  };

  // Fonction pour mettre à jour le statut d'un congé
  const updateLeaveStatus = (leaveId: string, newStatus: Leave['state']) => {
    setLoading(true);
    setError(null);
    
    try {
      setTimeout(() => {
        const updatedLeaves = leavesList.map(leave => 
          leave.id === leaveId 
            ? { ...leave, state: newStatus, updated_at: new Date().toISOString() } 
            : leave
        );
        
        setLeavesList(updatedLeaves);
        setLoading(false);
        
        toast({
          title: "Statut mis à jour",
          description: `Le statut du congé a été mis à jour avec succès.`
        });
      }, 500);
    } catch (err) {
      setError('Erreur lors de la mise à jour du statut');
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de mettre à jour le statut du congé."
      });
    }
  };

  // Fonction pour supprimer un congé
  const deleteLeave = (leaveId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      setTimeout(() => {
        const filteredLeaves = leavesList.filter(leave => leave.id !== leaveId);
        setLeavesList(filteredLeaves);
        setLoading(false);
        
        toast({
          title: "Congé supprimé",
          description: "La demande de congé a été supprimée avec succès."
        });
      }, 500);
    } catch (err) {
      setError('Erreur lors de la suppression du congé');
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de supprimer la demande de congé."
      });
    }
  };

  // Obtenir tous les types de congés
  const getLeaveTypes = () => leaveTypes;

  // Obtenir les soldes de congés d'un employé
  const getEmployeeLeaveBalances = (employeeId: string) => {
    return leaveBalances.filter(balance => balance.employee_id === employeeId);
  };

  return {
    leavesList,
    loading,
    error,
    getAllLeaves,
    getEmployeeLeaves,
    createLeaveRequest,
    updateLeaveStatus,
    deleteLeave,
    getLeaveTypes,
    getEmployeeLeaveBalances
  };
};
