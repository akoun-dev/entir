import { api } from '../../../src/services/api';
import { Contract } from '../types';

/**
 * Service pour la gestion des contrats
 * Fournit les méthodes pour interagir avec l'API backend
 */
export const contractService = {
  /**
   * Récupère tous les contrats
   * @returns Liste des contrats
   */
  async getAll(): Promise<Contract[]> {
    const response = await api.get<Contract[]>('/hr/contracts');
    return response.data;
  },

  /**
   * Récupère un contrat par son ID
   * @param id ID du contrat
   * @returns Données du contrat
   */
  async getById(id: string | number): Promise<Contract> {
    const response = await api.get<Contract>(`/hr/contracts/${id}`);
    return response.data;
  },

  /**
   * Récupère les contrats d'un employé
   * @param employeeId ID de l'employé
   * @returns Liste des contrats de l'employé
   */
  async getByEmployee(employeeId: string | number): Promise<Contract[]> {
    const response = await api.get<Contract[]>(`/hr/employees/${employeeId}/contracts`);
    return response.data;
  },

  /**
   * Crée un nouveau contrat
   * @param contract Données du contrat à créer
   * @returns Contrat créé
   */
  async create(contract: Omit<Contract, 'id'>): Promise<Contract> {
    const response = await api.post<Contract>('/hr/contracts', contract);
    return response.data;
  },

  /**
   * Met à jour un contrat existant
   * @param id ID du contrat
   * @param contract Données à mettre à jour
   * @returns Contrat mis à jour
   */
  async update(id: string | number, contract: Partial<Contract>): Promise<Contract> {
    const response = await api.put<Contract>(`/hr/contracts/${id}`, contract);
    return response.data;
  },

  /**
   * Supprime un contrat
   * @param id ID du contrat à supprimer
   * @returns Statut de la suppression
   */
  async delete(id: string | number): Promise<{ success: boolean }> {
    const response = await api.delete<{ success: boolean }>(`/hr/contracts/${id}`);
    return response.data;
  },

  /**
   * Met à jour le statut d'un contrat
   * @param id ID du contrat
   * @param status Nouveau statut
   * @returns Contrat mis à jour
   */
  async updateStatus(
    id: string | number,
    status: 'draft' | 'running' | 'expired' | 'cancelled'
  ): Promise<Contract> {
    const response = await api.put<Contract>(`/hr/contracts/${id}/status`, { status });
    return response.data;
  },

  /**
   * Renouvelle un contrat
   * @param id ID du contrat à renouveler
   * @param endDate Nouvelle date de fin
   * @param notes Notes sur le renouvellement
   * @returns Contrat mis à jour
   */
  async renewContract(
    id: string | number,
    endDate: string,
    notes?: string
  ): Promise<Contract> {
    const response = await api.post<Contract>(`/hr/contracts/${id}/renew`, {
      end_date: endDate,
      notes
    });
    return response.data;
  },

  /**
   * Termine un contrat
   * @param id ID du contrat à terminer
   * @param terminationDate Date de fin
   * @param reason Raison de la fin du contrat
   * @returns Contrat mis à jour
   */
  async terminateContract(
    id: string | number,
    terminationDate: string,
    reason: string
  ): Promise<Contract> {
    const response = await api.post<Contract>(`/hr/contracts/${id}/terminate`, {
      termination_date: terminationDate,
      reason
    });
    return response.data;
  },

  /**
   * Génère un document de contrat au format PDF
   * @param id ID du contrat
   * @returns URL du document généré
   */
  async generateContractDocument(id: string | number): Promise<string> {
    const response = await api.get<{ url: string }>(`/hr/contracts/${id}/document`);
    return response.data.url;
  },

  /**
   * Récupère les statistiques des contrats
   * @returns Statistiques des contrats
   */
  async getContractStats(): Promise<{
    totalContracts: number;
    activeContracts: number;
    expiringContracts: number;
    contractsByType: Record<string, number>;
  }> {
    const response = await api.get<{
      totalContracts: number;
      activeContracts: number;
      expiringContracts: number;
      contractsByType: Record<string, number>;
    }>('/hr/contracts/stats');
    return response.data;
  }
};

export default contractService;
