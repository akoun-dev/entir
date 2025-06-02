import { api } from '../../../src/services/api';
import { Leave, LeaveType, LeaveRequest, LeaveBalance } from '../types';

/**
 * Service pour la gestion des congés
 * Fournit les méthodes pour interagir avec l'API backend
 */
export const leaveService = {
  /**
   * Récupère tous les congés
   * @returns Liste des congés
   */
  async getAll(): Promise<Leave[]> {
    const response = await api.get<Leave[]>('/hr/leaves');
    return response.data;
  },

  /**
   * Récupère un congé par son ID
   * @param id ID du congé
   * @returns Données du congé
   */
  async getById(id: string | number): Promise<Leave> {
    const response = await api.get<Leave>(`/hr/leaves/${id}`);
    return response.data;
  },

  /**
   * Récupère les congés d'un employé
   * @param employeeId ID de l'employé
   * @returns Liste des congés de l'employé
   */
  async getByEmployee(employeeId: string | number): Promise<Leave[]> {
    const response = await api.get<Leave[]>(`/hr/employees/${employeeId}/leaves`);
    return response.data;
  },

  /**
   * Crée une demande de congé
   * @param leaveRequest Données de la demande de congé
   * @returns Congé créé
   */
  async create(leaveRequest: LeaveRequest): Promise<Leave> {
    const response = await api.post<Leave>('/hr/leaves', leaveRequest);
    return response.data;
  },

  /**
   * Met à jour le statut d'un congé
   * @param id ID du congé
   * @param status Nouveau statut
   * @param comment Commentaire optionnel
   * @returns Congé mis à jour
   */
  async updateStatus(
    id: string | number, 
    status: 'draft' | 'submitted' | 'approved' | 'refused' | 'cancelled',
    comment?: string
  ): Promise<Leave> {
    const response = await api.put<Leave>(`/hr/leaves/${id}/status`, { status, comment });
    return response.data;
  },

  /**
   * Supprime un congé
   * @param id ID du congé à supprimer
   * @returns Statut de la suppression
   */
  async delete(id: string | number): Promise<{ success: boolean }> {
    const response = await api.delete<{ success: boolean }>(`/hr/leaves/${id}`);
    return response.data;
  },

  /**
   * Récupère tous les types de congés
   * @returns Liste des types de congés
   */
  async getLeaveTypes(): Promise<LeaveType[]> {
    const response = await api.get<LeaveType[]>('/hr/leave-types');
    return response.data;
  },

  /**
   * Récupère un type de congé par son ID
   * @param id ID du type de congé
   * @returns Données du type de congé
   */
  async getLeaveTypeById(id: string | number): Promise<LeaveType> {
    const response = await api.get<LeaveType>(`/hr/leave-types/${id}`);
    return response.data;
  },

  /**
   * Crée un nouveau type de congé
   * @param leaveType Données du type de congé
   * @returns Type de congé créé
   */
  async createLeaveType(leaveType: Omit<LeaveType, 'id'>): Promise<LeaveType> {
    const response = await api.post<LeaveType>('/hr/leave-types', leaveType);
    return response.data;
  },

  /**
   * Met à jour un type de congé
   * @param id ID du type de congé
   * @param leaveType Données à mettre à jour
   * @returns Type de congé mis à jour
   */
  async updateLeaveType(id: string | number, leaveType: Partial<LeaveType>): Promise<LeaveType> {
    const response = await api.put<LeaveType>(`/hr/leave-types/${id}`, leaveType);
    return response.data;
  },

  /**
   * Supprime un type de congé
   * @param id ID du type de congé à supprimer
   * @returns Statut de la suppression
   */
  async deleteLeaveType(id: string | number): Promise<{ success: boolean }> {
    const response = await api.delete<{ success: boolean }>(`/hr/leave-types/${id}`);
    return response.data;
  },

  /**
   * Récupère les soldes de congés d'un employé
   * @param employeeId ID de l'employé
   * @returns Liste des soldes de congés
   */
  async getLeaveBalances(employeeId: string | number): Promise<LeaveBalance[]> {
    const response = await api.get<LeaveBalance[]>(`/hr/employees/${employeeId}/leave-balances`);
    return response.data;
  },

  /**
   * Alloue des jours de congés à un employé
   * @param employeeId ID de l'employé
   * @param leaveTypeId ID du type de congé
   * @param days Nombre de jours à allouer
   * @param year Année concernée
   * @returns Solde de congés mis à jour
   */
  async allocateLeaves(
    employeeId: string | number,
    leaveTypeId: string | number,
    days: number,
    year: number
  ): Promise<LeaveBalance> {
    const response = await api.post<LeaveBalance>('/hr/leave-allocations', {
      employee_id: employeeId,
      leave_type_id: leaveTypeId,
      days,
      year
    });
    return response.data;
  }
};

export default leaveService;
