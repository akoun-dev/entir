import { api } from '../../../src/services/api';

/**
 * Interface pour un manager
 */
interface Manager {
  id: string;
  name: string;
  job_title: string;
  avatar_url: string;
}

/**
 * Interface pour un département parent
 */
interface ParentDepartment {
  id: string;
  name: string;
}

/**
 * Interface pour un département
 */
interface Department {
  id: string;
  name: string;
  code: string;
  manager: Manager;
  parent: ParentDepartment;
  description: string;
  is_active: boolean;
  employee_count: number;
}

/**
 * Interface pour un employé
 */
interface Employee {
  id: string;
  name: string;
  job_title: string;
  avatar_url: string;
  is_active: boolean;
}

/**
 * Service pour la gestion des données RH avec compatibilité Odoo
 *
 * Ce service utilise le pattern Singleton pour garantir une seule instance
 * et fournit des méthodes pour interagir avec l'API backend.
 */
export class OdooHrService {
  private static instance: OdooHrService;
  private baseUrl: string = '/hr';

  /**
   * Constructeur privé pour empêcher l'instanciation directe
   */
  private constructor() {
    // Initialisation du service
    console.log('OdooHrService initialized');
  }

  /**
   * Obtient l'instance unique du service
   * @returns Instance du service
   */
  public static getInstance(): OdooHrService {
    if (!OdooHrService.instance) {
      OdooHrService.instance = new OdooHrService();
    }
    return OdooHrService.instance;
  }

  /**
   * Configure le service
   * @param baseUrl URL de base pour les requêtes API
   */
  public configure(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }

  /**
   * Récupère tous les départements
   * @returns Liste des départements
   */
  public async getDepartments(): Promise<Department[]> {
    try {
      const response = await api.get<Department[]>(`${this.baseUrl}/departments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);
      return this.getMockDepartments();
    }
  }

  /**
   * Récupère un département par son ID
   * @param id ID du département
   * @returns Données du département
   */
  public async getDepartment(id: string): Promise<Department> {
    try {
      const response = await api.get<Department>(`${this.baseUrl}/departments/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching department ${id}:`, error);
      return this.getMockDepartment(id);
    }
  }

  /**
   * Récupère les employés d'un département
   * @param departmentId ID du département
   * @returns Liste des employés du département
   */
  public async getDepartmentEmployees(departmentId: string): Promise<Employee[]> {
    try {
      const response = await api.get<Employee[]>(`${this.baseUrl}/departments/${departmentId}/employees`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching employees for department ${departmentId}:`, error);
      return this.getMockEmployees();
    }
  }

  /**
   * Récupère les sous-départements d'un département
   * @param departmentId ID du département parent
   * @returns Liste des sous-départements
   */
  public async getSubDepartments(departmentId: string): Promise<Department[]> {
    try {
      const response = await api.get<Department[]>(`${this.baseUrl}/departments/${departmentId}/subdepartments`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching subdepartments for department ${departmentId}:`, error);
      return this.getMockSubDepartments();
    }
  }

  /**
   * Récupère tous les employés
   * @returns Liste des employés
   */
  public async getEmployees(): Promise<Employee[]> {
    try {
      const response = await api.get<Employee[]>(`${this.baseUrl}/employees`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      return this.getMockEmployees();
    }
  }

  /**
   * Récupère un employé par son ID
   * @param id ID de l'employé
   * @returns Données de l'employé
   */
  public async getEmployee(id: string): Promise<Employee> {
    try {
      const response = await api.get<Employee>(`${this.baseUrl}/employees/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching employee ${id}:`, error);
      return this.getMockEmployee(id);
    }
  }

  /**
   * Génère des données simulées pour les départements
   * @returns Liste de départements simulés
   */
  private getMockDepartments(): Department[] {
    return [
      {
        id: '1',
        name: 'Direction',
        code: 'DIR',
        manager: { id: '1', name: 'Jean Dupont', job_title: 'Directeur Général', avatar_url: '' },
        parent: { id: '', name: '' },
        description: 'Direction générale de l\'entreprise',
        is_active: true,
        employee_count: 5
      },
      {
        id: '2',
        name: 'Informatique',
        code: 'IT',
        manager: { id: '2', name: 'Marie Martin', job_title: 'Chef de projet', avatar_url: '' },
        parent: { id: '1', name: 'Direction' },
        description: 'Département informatique responsable du développement et de la maintenance des systèmes d\'information.',
        is_active: true,
        employee_count: 15
      },
      {
        id: '3',
        name: 'Ressources Humaines',
        code: 'RH',
        manager: { id: '3', name: 'Sophie Lefebvre', job_title: 'Directrice RH', avatar_url: '' },
        parent: { id: '1', name: 'Direction' },
        description: 'Département des ressources humaines',
        is_active: true,
        employee_count: 8
      }
    ];
  }

  /**
   * Génère des données simulées pour un département spécifique
   * @param id ID du département
   * @returns Département simulé
   */
  private getMockDepartment(id: string): Department {
    const departments = this.getMockDepartments();
    const department = departments.find(dept => dept.id === id);

    if (department) {
      return department;
    }

    return {
      id,
      name: 'Département inconnu',
      code: 'UNKNOWN',
      manager: { id: '', name: 'Non assigné', job_title: '', avatar_url: '' },
      parent: { id: '', name: '' },
      description: 'Aucune description disponible',
      is_active: true,
      employee_count: 0
    };
  }

  /**
   * Génère des données simulées pour les employés
   * @returns Liste d'employés simulés
   */
  private getMockEmployees(): Employee[] {
    return [
      { id: '1', name: 'Jean Dupont', job_title: 'Directeur Général', avatar_url: '', is_active: true },
      { id: '2', name: 'Marie Martin', job_title: 'Chef de projet', avatar_url: '', is_active: true },
      { id: '3', name: 'Sophie Lefebvre', job_title: 'Directrice RH', avatar_url: '', is_active: true },
      { id: '4', name: 'Pierre Durand', job_title: 'Développeur Backend', avatar_url: '', is_active: true },
      { id: '5', name: 'Thomas Bernard', job_title: 'Administrateur système', avatar_url: '', is_active: false }
    ];
  }

  /**
   * Génère des données simulées pour un employé spécifique
   * @param id ID de l'employé
   * @returns Employé simulé
   */
  private getMockEmployee(id: string): Employee {
    const employees = this.getMockEmployees();
    const employee = employees.find(emp => emp.id === id);

    if (employee) {
      return employee;
    }

    return {
      id,
      name: 'Employé inconnu',
      job_title: 'Poste non spécifié',
      avatar_url: '',
      is_active: false
    };
  }

  /**
   * Génère des données simulées pour les sous-départements
   * @returns Liste de sous-départements simulés
   */
  private getMockSubDepartments(): Department[] {
    return [
      {
        id: '4',
        name: 'Développement Web',
        code: 'DEV-WEB',
        manager: { id: '4', name: 'Pierre Durand', job_title: 'Développeur Backend', avatar_url: '' },
        parent: { id: '2', name: 'Informatique' },
        description: 'Équipe de développement web',
        is_active: true,
        employee_count: 8
      },
      {
        id: '5',
        name: 'Infrastructure',
        code: 'INFRA',
        manager: { id: '5', name: 'Thomas Bernard', job_title: 'Administrateur système', avatar_url: '' },
        parent: { id: '2', name: 'Informatique' },
        description: 'Équipe d\'infrastructure et de support technique',
        is_active: true,
        employee_count: 5
      }
    ];
  }
}

// Exporter l'instance par défaut
export default OdooHrService;
