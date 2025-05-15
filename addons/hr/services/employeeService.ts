import { Employee } from '../models/types';
import OdooHrService from './odooHrService';
import { SearchOptions } from '../../../src/types/addon';

/**
 * Service pour la gestion des employés
 */
class EmployeeService {
  private odooService: OdooHrService;

  constructor() {
    this.odooService = OdooHrService.getInstance();
  }

  /**
   * Récupère tous les employés
   * @param options Options de recherche
   * @returns Liste des employés
   */
  async getAllEmployees(options: SearchOptions = {}): Promise<Employee[]> {
    return this.odooService.getEmployees(options);
  }

  /**
   * Récupère un employé par son ID
   * @param id ID de l'employé
   * @returns L'employé ou null s'il n'existe pas
   */
  async getEmployeeById(id: number): Promise<Employee | null> {
    return this.odooService.getEmployeeById(id);
  }

  /**
   * Crée un nouvel employé
   * @param employee Données de l'employé
   * @returns L'employé créé
   */
  async createEmployee(employee: Partial<Employee>): Promise<Employee> {
    // Dans une implémentation réelle, cela ferait un appel API
    // Pour le moment, on simule une création
    const newEmployee: Employee = {
      ...employee,
      id: Math.floor(Math.random() * 1000) + 10,
      active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as Employee;
    
    return newEmployee;
  }

  /**
   * Met à jour un employé existant
   * @param id ID de l'employé
   * @param employee Données à mettre à jour
   * @returns L'employé mis à jour
   */
  async updateEmployee(id: number, employee: Partial<Employee>): Promise<Employee> {
    // Dans une implémentation réelle, cela ferait un appel API
    const existingEmployee = await this.getEmployeeById(id);
    if (!existingEmployee) {
      throw new Error(`Employé avec l'ID ${id} non trouvé`);
    }
    
    const updatedEmployee: Employee = {
      ...existingEmployee,
      ...employee,
      updated_at: new Date().toISOString()
    };
    
    return updatedEmployee;
  }

  /**
   * Supprime un employé
   * @param id ID de l'employé
   * @returns true si supprimé avec succès
   */
  async deleteEmployee(id: number): Promise<boolean> {
    // Dans une implémentation réelle, cela ferait un appel API
    return true;
  }
}

export default new EmployeeService();
