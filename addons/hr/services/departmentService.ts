import { api } from '../../../src/services/api';
import { Department } from '../types';

/**
 * Service pour la gestion des départements
 * Fournit les méthodes pour interagir avec l'API backend
 */
export const departmentService = {
  /**
   * Récupère tous les départements
   * @returns Liste des départements
   */
  async getAll(): Promise<Department[]> {
    const response = await api.get<Department[]>('/hr/departments');
    return response.data;
  },

  /**
   * Récupère un département par son ID
   * @param id ID du département
   * @returns Données du département
   */
  async getById(id: string | number): Promise<Department> {
    const response = await api.get<Department>(`/hr/departments/${id}`);
    return response.data;
  },

  /**
   * Crée un nouveau département
   * @param department Données du département à créer
   * @returns Département créé
   */
  async create(department: Omit<Department, 'id'>): Promise<Department> {
    const response = await api.post<Department>('/hr/departments', department);
    return response.data;
  },

  /**
   * Met à jour un département existant
   * @param id ID du département
   * @param department Données à mettre à jour
   * @returns Département mis à jour
   */
  async update(id: string | number, department: Partial<Department>): Promise<Department> {
    const response = await api.put<Department>(`/hr/departments/${id}`, department);
    return response.data;
  },

  /**
   * Supprime un département
   * @param id ID du département à supprimer
   * @returns Statut de la suppression
   */
  async delete(id: string | number): Promise<{ success: boolean }> {
    const response = await api.delete<{ success: boolean }>(`/hr/departments/${id}`);
    return response.data;
  },

  /**
   * Récupère les sous-départements d'un département
   * @param parentId ID du département parent
   * @returns Liste des sous-départements
   */
  async getSubDepartments(parentId: string | number): Promise<Department[]> {
    const response = await api.get<Department[]>(`/hr/departments/${parentId}/subdepartments`);
    return response.data;
  },

  /**
   * Récupère la hiérarchie complète des départements
   * @returns Structure hiérarchique des départements
   */
  async getDepartmentHierarchy(): Promise<Department[]> {
    const response = await api.get<Department[]>('/hr/departments/hierarchy');
    return response.data;
  },

  /**
   * Récupère les statistiques des départements
   * @returns Statistiques des départements
   */
  async getDepartmentStats(): Promise<{ 
    totalDepartments: number;
    activeDepartments: number;
    totalEmployees: number;
    departmentsWithoutManager: number;
  }> {
    const response = await api.get<{ 
      totalDepartments: number;
      activeDepartments: number;
      totalEmployees: number;
      departmentsWithoutManager: number;
    }>('/hr/departments/stats');
    return response.data;
  }
};

export default departmentService;
