
import ApiService from './apiService';
import { OrgChartPerson, OrgChartDepartment, OrgChartData } from '../types/organization';
import { SearchOptions } from '../../../src/types/addon';
import { toast } from 'sonner';
import { ImportMapping, ImportConfig, ImportResult } from './etlService';

/**
 * Interface pour les réponses API de l'organigramme
 */
interface ApiOrgChartResponse {
  data: {
    root_person: any;
    departments: any[];
  };
  status: string;
  message?: string;
}

/**
 * Service pour l'interaction avec l'API de l'organigramme
 */
export class OrganizationApiService {
  private static instance: OrganizationApiService;
  private apiBaseUrl: string = '/organization';
  private fallbackEnabled: boolean = true; // Active le mode fallback par défaut
  
  // Singleton
  private constructor() {}
  
  public static getInstance(): OrganizationApiService {
    if (!OrganizationApiService.instance) {
      OrganizationApiService.instance = new OrganizationApiService();
    }
    return OrganizationApiService.instance;
  }

  /**
   * Configure le service
   */
  public configure(config: { 
    apiBaseUrl?: string;
    fallbackEnabled?: boolean;
  }): void {
    if (config.apiBaseUrl) {
      this.apiBaseUrl = config.apiBaseUrl;
    }
    
    if (config.fallbackEnabled !== undefined) {
      this.fallbackEnabled = config.fallbackEnabled;
    }
    
    console.log('[OrganizationApiService] Configured with:', { 
      apiBaseUrl: this.apiBaseUrl,
      fallbackEnabled: this.fallbackEnabled
    });
  }

  /**
   * Récupère les données de l'organigramme depuis l'API
   */
  public async getOrgChartData(options?: SearchOptions): Promise<OrgChartData> {
    try {
      // Tentative de récupération depuis l'API
      const api = ApiService;
      
      if (!api.isServiceInitialized()) {
        console.warn('API Service not initialized. Using fallback data.');
        return this.getFallbackData();
      }
      
      const response = await api.get<ApiOrgChartResponse>(
        `${this.apiBaseUrl}/chart`, 
        { params: options }
      );
      
      // Mapper les données de l'API vers le format attendu
      return this.mapApiResponseToOrgChartData(response);
      
    } catch (error) {
      console.error('Error fetching org chart data from API:', error);
      
      // Si le mode fallback est activé, retourner des données simulées
      if (this.fallbackEnabled) {
        console.log('Using fallback data instead');
        return this.getFallbackData();
      }
      
      // Sinon, propager l'erreur
      throw error;
    }
  }

  /**
   * Sauvegarde les modifications de l'organigramme
   */
  public async saveOrgChartData(data: OrgChartPerson): Promise<boolean> {
    try {
      // Mapper les données au format attendu par l'API
      const apiData = this.mapOrgChartDataToApiFormat(data);
      
      // Envoyer à l'API
      const api = ApiService;
      
      if (!api.isServiceInitialized()) {
        console.warn('API Service not initialized. Cannot save data.');
        throw new Error('API Service not initialized');
      }
      
      await api.put(
        `${this.apiBaseUrl}/chart`, 
        apiData
      );
      
      return true;
      
    } catch (error) {
      console.error('Error saving org chart data to API:', error);
      
      if (this.fallbackEnabled) {
        // En mode fallback, simuler une sauvegarde réussie
        console.log('Simulating successful save in fallback mode');
        
        // Sauvegarder dans le localStorage pour persistance
        try {
          const cacheKey = 'orgChartData';
          const cacheObject = {
            data: { rootPerson: data, departments: [] },
            timestamp: Date.now()
          };
          localStorage.setItem(cacheKey, JSON.stringify(cacheObject));
          return true;
        } catch (e) {
          console.error("Error saving to localStorage:", e);
          return false;
        }
      }
      
      throw error;
    }
  }

  /**
   * Récupère les employés depuis l'API
   */
  public async getEmployees(options?: SearchOptions): Promise<OrgChartPerson[]> {
    try {
      const api = ApiService;
      
      if (!api.isServiceInitialized()) {
        console.warn('API Service not initialized. Using fallback employees.');
        return this.getFallbackEmployees();
      }
      
      const response = await api.get(
        `${this.apiBaseUrl}/employees`, 
        { params: options }
      );
      
      // Mapper les données de l'API vers le format attendu
      return response.data.map(this.mapApiEmployeeToOrgChartPerson);
      
    } catch (error) {
      console.error('Error fetching employees from API:', error);
      
      if (this.fallbackEnabled) {
        return this.getFallbackEmployees();
      }
      
      throw error;
    }
  }

  /**
   * Récupère les départements depuis l'API
   */
  public async getDepartments(options?: SearchOptions): Promise<OrgChartDepartment[]> {
    try {
      const api = ApiService;
      
      if (!api.isServiceInitialized()) {
        console.warn('API Service not initialized. Using fallback departments.');
        return this.getFallbackDepartments();
      }
      
      const response = await api.get(
        `${this.apiBaseUrl}/departments`, 
        { params: options }
      );
      
      // Mapper les données de l'API vers le format attendu
      return response.data.map(this.mapApiDepartmentToOrgChartDepartment);
      
    } catch (error) {
      console.error('Error fetching departments from API:', error);
      
      if (this.fallbackEnabled) {
        return this.getFallbackDepartments();
      }
      
      throw error;
    }
  }

  /**
   * Importe des employés à partir de données CSV/Excel
   */
  public async importEmployees(
    employees: Array<Record<string, any>>, 
    config: ImportConfig
  ): Promise<ImportResult> {
    try {
      const api = ApiService;
      
      if (!api.isServiceInitialized()) {
        console.warn('API Service not initialized. Cannot import employees.');
        throw new Error('API Service not initialized');
      }
      
      // Envoyer les données à l'API
      const response = await api.post(
        `${this.apiBaseUrl}/employees/import`,
        { 
          employees,
          config
        }
      );
      
      return response;
      
    } catch (error) {
      console.error('Error importing employees via API:', error);
      
      if (this.fallbackEnabled) {
        // En mode fallback, simuler une réponse d'import
        console.log('Simulating successful import in fallback mode');
        return {
          success: true,
          total: employees.length,
          created: config.createMissing ? employees.length : 0,
          updated: 0,
          skipped: config.createMissing ? 0 : employees.length,
          errors: []
        };
      }
      
      throw error;
    }
  }

  /**
   * Exporte les employés au format CSV/Excel
   */
  public async exportEmployees(format: 'csv' | 'excel' | 'json' = 'csv'): Promise<Blob> {
    try {
      const api = ApiService;
      
      if (!api.isServiceInitialized()) {
        throw new Error('API Service not initialized');
      }
      
      // Appel API pour générer l'export
      const response = await api.get(
        `${this.apiBaseUrl}/employees/export`,
        { 
          params: { format },
          responseType: 'blob'
        }
      );
      
      return response;
      
    } catch (error) {
      console.error('Error exporting employees via API:', error);
      
      if (this.fallbackEnabled) {
        // Générer un export local basé sur les données en cache
        const employees = await this.getFallbackEmployees();
        
        // Convertir en CSV simple
        const headers = ['id', 'name', 'position', 'department', 'email', 'phone'];
        const rows = employees.map(emp => 
          headers.map(key => (emp as any)[key] || '').join(',')
        );
        
        const csvContent = [
          headers.join(','),
          ...rows
        ].join('\n');
        
        return new Blob([csvContent], { type: 'text/csv' });
      }
      
      throw error;
    }
  }

  /**
   * Mappe les données de l'API vers le format attendu par l'application
   */
  private mapApiResponseToOrgChartData(apiResponse: ApiOrgChartResponse): OrgChartData {
    if (!apiResponse || !apiResponse.data) {
      throw new Error('Invalid API response format');
    }
    
    const { root_person, departments } = apiResponse.data;
    
    return {
      rootPerson: this.mapApiPersonToOrgChartPerson(root_person),
      departments: departments.map(this.mapApiDepartmentToOrgChartDepartment)
    };
  }

  /**
   * Mappe un employé du format API vers le format application
   */
  private mapApiPersonToOrgChartPerson(apiPerson: any): OrgChartPerson {
    if (!apiPerson) return {} as OrgChartPerson;
    
    return {
      id: apiPerson.id.toString(),
      name: apiPerson.name || '',
      position: apiPerson.job_title || apiPerson.position || '',
      department: apiPerson.department_name || apiPerson.department || '',
      email: apiPerson.work_email || apiPerson.email || '',
      phone: apiPerson.work_phone || apiPerson.phone || '',
      imageUrl: apiPerson.image_url || apiPerson.imageUrl || '',
      children: Array.isArray(apiPerson.children) 
        ? apiPerson.children.map(this.mapApiPersonToOrgChartPerson)
        : undefined
    };
  }

  /**
   * Mappe un employé du format application vers le format API
   */
  private mapOrgChartPersonToApiPerson(person: OrgChartPerson): any {
    return {
      id: person.id,
      name: person.name,
      job_title: person.position,
      department_name: person.department,
      work_email: person.email,
      work_phone: person.phone,
      image_url: person.imageUrl,
      children: Array.isArray(person.children)
        ? person.children.map(this.mapOrgChartPersonToApiPerson)
        : []
    };
  }

  /**
   * Mappe les données de l'organigramme vers le format API pour sauvegarde
   */
  private mapOrgChartDataToApiFormat(rootPerson: OrgChartPerson): any {
    return {
      root_person: this.mapOrgChartPersonToApiPerson(rootPerson),
      // Autres données si nécessaires
    };
  }

  /**
   * Mappe un employé du format API vers le format application
   */
  private mapApiEmployeeToOrgChartPerson(apiEmployee: any): OrgChartPerson {
    return this.mapApiPersonToOrgChartPerson(apiEmployee);
  }

  /**
   * Mappe un département du format API vers le format application
   */
  private mapApiDepartmentToOrgChartDepartment(apiDepartment: any): OrgChartDepartment {
    if (!apiDepartment) return {} as OrgChartDepartment;
    
    return {
      id: apiDepartment.id.toString(),
      name: apiDepartment.name || '',
      description: apiDepartment.description || '',
      manager: apiDepartment.manager 
        ? this.mapApiPersonToOrgChartPerson(apiDepartment.manager) 
        : undefined,
      employees: Array.isArray(apiDepartment.employees)
        ? apiDepartment.employees.map(this.mapApiEmployeeToOrgChartPerson)
        : [],
      subDepartments: Array.isArray(apiDepartment.sub_departments)
        ? apiDepartment.sub_departments.map(this.mapApiDepartmentToOrgChartDepartment)
        : undefined,
      code: apiDepartment.code || '',
      color: apiDepartment.color || '',
      managerTitle: apiDepartment.manager_title || ''
    };
  }

  /**
   * Données de fallback (pour tests ou mode hors ligne)
   */
  private getFallbackData(): OrgChartData {
    // Utiliser les données de test existantes
    try {
      const cachedData = localStorage.getItem('orgChartData');
      if (cachedData) {
        const { data } = JSON.parse(cachedData);
        return data;
      }
    } catch (e) {
      console.error("Error retrieving from cache:", e);
    }
    
    // Si pas de cache, créer des données par défaut (simplifiées)
    return {
      rootPerson: {
        id: "1",
        name: "PDG (Mode Hors Ligne)",
        position: "Directeur Général",
        department: "Direction",
        email: "dg@example.com",
        children: [
          {
            id: "2",
            name: "Directeur Commercial",
            position: "Dir. Commercial",
            department: "Ventes",
            email: "commercial@example.com",
            children: []
          },
          {
            id: "3",
            name: "Directeur RH",
            position: "DRH",
            department: "Ressources Humaines",
            email: "drh@example.com",
            children: []
          }
        ]
      },
      departments: [
        {
          id: "dept1",
          name: "Direction",
          employees: []
        },
        {
          id: "dept2",
          name: "Ventes",
          employees: []
        },
        {
          id: "dept3",
          name: "Ressources Humaines",
          employees: []
        }
      ]
    };
  }

  /**
   * Employés de fallback
   */
  private getFallbackEmployees(): OrgChartPerson[] {
    const fallbackData = this.getFallbackData();
    
    // Extraire tous les employés de la structure hiérarchique
    const extractEmployees = (person: OrgChartPerson): OrgChartPerson[] => {
      const employees: OrgChartPerson[] = [person];
      
      if (person.children && person.children.length > 0) {
        for (const child of person.children) {
          employees.push(...extractEmployees(child));
        }
      }
      
      return employees;
    };
    
    if (fallbackData.rootPerson) {
      return extractEmployees(fallbackData.rootPerson);
    }
    
    return [];
  }

  /**
   * Départements de fallback
   */
  private getFallbackDepartments(): OrgChartDepartment[] {
    const fallbackData = this.getFallbackData();
    return fallbackData.departments || [];
  }

  /**
   * Test de connexion à l'API
   */
  public async testConnection(): Promise<boolean> {
    try {
      const api = ApiService;
      
      if (!api.isServiceInitialized()) {
        return false;
      }
      
      // Tentative d'appel à un endpoint de test
      await api.get(`${this.apiBaseUrl}/ping`);
      return true;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
}

// Export de l'instance par défaut
export default OrganizationApiService.getInstance();
