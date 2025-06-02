import { api } from '../../../src/services/api';
import { Employee, EmployeeFormData, ImportResult } from '../types';

/**
 * Service pour la gestion des employés
 * Fournit les méthodes pour interagir avec l'API backend
 */
export const employeeService = {
  /**
   * Récupère tous les employés
   * @returns Liste des employés
   */
  async getAll(): Promise<Employee[]> {
    const response = await api.get<Employee[]>('/hr/employees');
    return response.data;
  },

  /**
   * Récupère tous les employés (alias pour getAll)
   * @returns Liste des employés
   */
  async getAllEmployees(): Promise<Employee[]> {
    return this.getAll();
  },

  /**
   * Récupère un employé par son ID
   * @param id ID de l'employé
   * @returns Données de l'employé
   */
  async getById(id: string | number): Promise<Employee> {
    const response = await api.get<Employee>(`/hr/employees/${id}`);
    return response.data;
  },

  /**
   * Récupère un employé par son ID (alias pour getById)
   * @param id ID de l'employé
   * @returns Données de l'employé
   */
  async getEmployeeById(id: string | number): Promise<Employee> {
    return this.getById(id);
  },

  /**
   * Crée un nouvel employé
   * @param employee Données de l'employé à créer
   * @returns Employé créé
   */
  async create(employee: Omit<EmployeeFormData, 'id'>): Promise<Employee> {
    const response = await api.post<Employee>('/hr/employees', employee);
    return response.data;
  },

  /**
   * Crée un nouvel employé (alias pour create)
   * @param employee Données de l'employé à créer
   * @returns Employé créé
   */
  async createEmployee(employee: Omit<EmployeeFormData, 'id'>): Promise<Employee> {
    return this.create(employee);
  },

  /**
   * Met à jour un employé existant
   * @param id ID de l'employé
   * @param employee Données à mettre à jour
   * @returns Employé mis à jour
   */
  async update(id: string | number, employee: Partial<EmployeeFormData>): Promise<Employee> {
    const response = await api.put<Employee>(`/hr/employees/${id}`, employee);
    return response.data;
  },

  /**
   * Met à jour un employé existant (alias pour update)
   * @param id ID de l'employé
   * @param employee Données à mettre à jour
   * @returns Employé mis à jour
   */
  async updateEmployee(id: string | number, employee: Partial<EmployeeFormData>): Promise<Employee> {
    return this.update(id, employee);
  },

  /**
   * Supprime un employé
   * @param id ID de l'employé à supprimer
   * @returns Statut de la suppression
   */
  async delete(id: string | number): Promise<{ success: boolean }> {
    const response = await api.delete<{ success: boolean }>(`/hr/employees/${id}`);
    return response.data;
  },

  /**
   * Supprime un employé (alias pour delete)
   * @param id ID de l'employé à supprimer
   * @returns Statut de la suppression
   */
  async deleteEmployee(id: string | number): Promise<{ success: boolean }> {
    return this.delete(id);
  },

  /**
   * Récupère les employés par département
   * @param departmentId ID du département
   * @returns Liste des employés du département
   */
  async getEmployeesByDepartment(departmentId: string | number): Promise<Employee[]> {
    const response = await api.get<Employee[]>(`/hr/departments/${departmentId}/employees`);
    return response.data;
  },

  /**
   * Récupère les employés par manager
   * @param managerId ID du manager
   * @returns Liste des employés sous la responsabilité du manager
   */
  async getEmployeesByManager(managerId: string | number): Promise<Employee[]> {
    const response = await api.get<Employee[]>(`/hr/employees/manager/${managerId}`);
    return response.data;
  },

  /**
   * Importe des employés à partir d'un fichier
   * @param file Fichier à importer (CSV, XLSX)
   * @param options Options d'importation
   * @returns Résultat de l'importation
   */
  async importEmployees(file: File, options?: { updateExisting?: boolean }): Promise<ImportResult> {
    const formData = new FormData();
    formData.append('file', file);

    if (options?.updateExisting) {
      formData.append('updateExisting', String(options.updateExisting));
    }

    const response = await api.post<ImportResult>('/hr/employees/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  /**
   * Exporte les employés au format demandé
   * @param format Format d'exportation (csv, xlsx, pdf)
   * @param filters Filtres à appliquer
   * @returns URL du fichier exporté
   */
  async exportEmployees(format: 'csv' | 'xlsx' | 'pdf', filters?: Record<string, any>): Promise<string> {
    const response = await api.post<{ url: string }>(`/hr/employees/export/${format}`, { filters });
    return response.data.url;
  }
};

// Exporter le service comme exportation par défaut
export default employeeService;
