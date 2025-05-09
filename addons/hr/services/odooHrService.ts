import { Employee, Department, Leave, Timesheet } from '../models/types';
import { SearchOptions } from '../../../src/types/addon';

/**
 * Service pour l'intégration avec Odoo HR
 * Gère les appels API vers le backend Odoo
 */
class OdooHrService {
  private static instance: OdooHrService;
  private baseUrl: string = '/api/odoo';

  // Singleton
  public static getInstance(): OdooHrService {
    if (!OdooHrService.instance) {
      OdooHrService.instance = new OdooHrService();
    }
    return OdooHrService.instance;
  }

  /**
   * Récupère la liste des employés
   * @param options Options de recherche
   * @returns Liste des employés
   */
  public async getEmployees(options: SearchOptions = {}): Promise<Employee[]> {
    // Simulation de données pour le moment
    // Dans une implémentation réelle, cela ferait un appel API
    return [
      {
        id: 1,
        name: 'Jean Dupont',
        job_title: 'Directeur',
        department_id: 1,
        department_name: 'Direction',
        work_email: 'jean.dupont@example.com',
        work_phone: '+33123456789',
        active: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Marie Martin',
        job_title: 'Responsable RH',
        department_id: 2,
        department_name: 'Ressources Humaines',
        work_email: 'marie.martin@example.com',
        work_phone: '+33123456790',
        parent_id: 1,
        manager_name: 'Jean Dupont',
        active: true,
        created_at: '2023-01-02T00:00:00Z',
        updated_at: '2023-01-02T00:00:00Z'
      }
    ];
  }

  /**
   * Récupère un employé par son ID
   * @param id ID de l'employé
   * @returns L'employé ou null s'il n'existe pas
   */
  public async getEmployeeById(id: number): Promise<Employee | null> {
    const employees = await this.getEmployees();
    return employees.find(emp => emp.id === id) || null;
  }

  /**
   * Récupère la liste des départements
   * @param options Options de recherche
   * @returns Liste des départements
   */
  public async getDepartments(options: SearchOptions = {}): Promise<Department[]> {
    // Simulation de données
    return [
      {
        id: 1,
        name: 'Direction',
        manager_id: 1,
        manager_name: 'Jean Dupont',
        active: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
      },
      {
        id: 2,
        name: 'Ressources Humaines',
        manager_id: 2,
        manager_name: 'Marie Martin',
        active: true,
        created_at: '2023-01-02T00:00:00Z',
        updated_at: '2023-01-02T00:00:00Z'
      }
    ];
  }

  /**
   * Récupère les congés
   * @param options Options de recherche
   * @returns Liste des congés
   */
  public async getLeaves(options: SearchOptions = {}): Promise<Leave[]> {
    // Simulation de données
    return [
      {
        id: 1,
        employee_id: 2,
        employee_name: 'Marie Martin',
        date_from: '2023-07-01',
        date_to: '2023-07-15',
        state: 'approved',
        type: 'Congés payés',
        created_at: '2023-06-01T00:00:00Z',
        updated_at: '2023-06-05T00:00:00Z'
      }
    ];
  }
}

export default OdooHrService;
