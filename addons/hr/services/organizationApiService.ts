import { api } from '../../../src/services/api';
import { OrgChartPerson, OrgChartData } from '../types/organization';
import ApiService from './apiService';

/**
 * Interface pour les options de configuration du service d'organisation
 */
interface OrganizationApiConfig {
  apiBaseUrl?: string;
  fallbackEnabled?: boolean;
}

/**
 * Service pour la gestion de l'organigramme
 * Fournit les méthodes pour interagir avec l'API backend
 */
const organizationApiService = {
  // Configuration par défaut
  config: {
    apiBaseUrl: '/hr/organization',
    fallbackEnabled: true
  },

  /**
   * Configure le service d'organisation
   * @param config Configuration du service
   */
  configure(config: OrganizationApiConfig): void {
    this.config = { ...this.config, ...config };
    console.log('Organization API Service configured:', this.config);
  },

  /**
   * Teste la connexion à l'API d'organisation
   * @returns true si la connexion est établie, false sinon
   */
  async testConnection(): Promise<boolean> {
    try {
      // Tester la connexion en récupérant les statistiques
      await ApiService.get(`${this.config.apiBaseUrl}/health`);
      return true;
    } catch (error) {
      console.error('Organization API connection test failed:', error);
      return false;
    }
  },
  /**
   * Récupère les données de l'organigramme
   * @returns Données de l'organigramme
   */
  async getOrgChartData(): Promise<OrgChartData> {
    try {
      const response = await ApiService.get<{ data: OrgChartData }>(`${this.config.apiBaseUrl}/chart`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching org chart data:', error);

      // Si le mode fallback est activé, retourner des données simulées
      if (this.config.fallbackEnabled) {
        console.log('Using fallback data for org chart');
        return this._getFallbackOrgChartData();
      }

      throw error;
    }
  },

  /**
   * Génère des données simulées pour l'organigramme
   * @returns Données simulées de l'organigramme
   * @private
   */
  _getFallbackOrgChartData(): OrgChartData {
    // Données simulées pour l'organigramme
    // Cette fonction est utilisée en mode fallback si l'API n'est pas disponible

    // Directeur Général - fixed data, not random
    const rootPerson: OrgChartPerson = {
      id: "1",
      name: "Koné Amadou",
      position: "Directeur Général",
      department: "Direction Générale",
      email: "k.amadou@example.com",
      imageUrl: "/assets/avatars/kone.jpg",
      children: []
    };

    // Directeurs de départements - stable structure
    const directeurs: OrgChartPerson[] = [
      {
        id: "2",
        name: "Bamba Sarah",
        position: "Directrice RH",
        department: "Ressources Humaines",
        email: "b.sarah@example.com",
        children: []
      },
      {
        id: "3",
        name: "Touré Jean",
        position: "Directeur Financier",
        department: "Finance",
        email: "t.jean@example.com",
        children: []
      },
      {
        id: "4",
        name: "Kouamé Paul",
        position: "Directeur Technique",
        department: "Technique",
        email: "k.paul@example.com",
        children: []
      },
      {
        id: "11",
        name: "Konan Michelle",
        position: "Directrice Marketing",
        department: "Marketing",
        email: "m.konan@example.com",
        children: []
      }
    ];

    // Ajouter les directeurs comme enfants du DG
    rootPerson.children = directeurs;

    // Créer la structure des départements - stable structure
    const departments = [
      {
        id: "dept1",
        name: "Direction Générale",
        manager: rootPerson,
        employees: [rootPerson]
      },
      {
        id: "dept2",
        name: "Ressources Humaines",
        manager: directeurs[0],
        employees: [
          directeurs[0],
          {
            id: "5",
            name: "Koménan Blan Gerard",
            position: "Responsable Recrutement",
            department: "Ressources Humaines",
            email: "b.komenan@example.com"
          },
          {
            id: "6",
            name: "Aka Marie",
            position: "Responsable Formation",
            department: "Ressources Humaines",
            email: "a.marie@example.com"
          }
        ]
      },
      {
        id: "dept3",
        name: "Finance",
        manager: directeurs[1],
        employees: [
          directeurs[1],
          {
            id: "7",
            name: "Aka Alexis",
            position: "Responsable Comptabilité",
            department: "Finance",
            email: "a.alexis@example.com"
          },
          {
            id: "8",
            name: "Traore Doféme",
            position: "Responsable Budget",
            department: "Finance",
            email: "d.traore@example.com"
          }
        ]
      },
      {
        id: "dept4",
        name: "Technique",
        manager: directeurs[2],
        employees: [
          directeurs[2],
          {
            id: "9",
            name: "Somet Patrick",
            position: "Chef de Projet",
            department: "Technique",
            email: "p.somet@example.com"
          },
          {
            id: "10",
            name: "Yrou Frank",
            position: "Ingénieur Système",
            department: "Technique",
            email: "f.yrou@example.com"
          }
        ]
      },
      {
        id: "dept5",
        name: "Marketing",
        manager: directeurs[3],
        employees: [
          directeurs[3],
          {
            id: "14",
            name: "Bamba Ali",
            position: "Responsable Communication",
            department: "Marketing",
            email: "a.bamba@example.com"
          },
          {
            id: "15",
            name: "Diomande Fanta",
            position: "Responsable Digital",
            department: "Marketing",
            email: "f.diomande@example.com"
          }
        ]
      }
    ];

    return {
      rootPerson,
      departments
    };
  },

  /**
   * Sauvegarde les données de l'organigramme
   * @param rootPerson Personne racine de l'organigramme
   * @returns Statut de la sauvegarde
   */
  async saveOrgChartData(rootPerson: OrgChartPerson): Promise<{ success: boolean }> {
    try {
      const response = await ApiService.post<{ success: boolean }>(`${this.config.apiBaseUrl}/chart`, { rootPerson });
      return response.data;
    } catch (error) {
      console.error('Error saving org chart data:', error);

      // Si le mode fallback est activé, simuler une sauvegarde réussie
      if (this.config.fallbackEnabled) {
        console.log('Using fallback mode for saving org chart data');
        return { success: true };
      }

      throw error;
    }
  },

  /**
   * Récupère la structure des départements
   * @returns Liste des départements
   */
  async getDepartments() {
    try {
      const response = await ApiService.get(`${this.config.apiBaseUrl}/departments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);

      // Si le mode fallback est activé, retourner des données simulées
      if (this.config.fallbackEnabled) {
        console.log('Using fallback data for departments');
        return this._getFallbackOrgChartData().departments;
      }

      throw error;
    }
  },

  /**
   * Récupère la hiérarchie des employés
   * @returns Hiérarchie des employés
   */
  async getEmployeeHierarchy() {
    try {
      const response = await ApiService.get(`${this.config.apiBaseUrl}/hierarchy`);
      return response.data;
    } catch (error) {
      console.error('Error fetching employee hierarchy:', error);

      // Si le mode fallback est activé, retourner des données simulées
      if (this.config.fallbackEnabled) {
        console.log('Using fallback data for employee hierarchy');
        return this._getFallbackOrgChartData().rootPerson;
      }

      throw error;
    }
  },

  /**
   * Déplace un employé dans la hiérarchie
   * @param employeeId ID de l'employé à déplacer
   * @param newManagerId ID du nouveau manager
   * @returns Statut du déplacement
   */
  async moveEmployee(employeeId: string | number, newManagerId: string | number): Promise<{ success: boolean }> {
    try {
      const response = await ApiService.post<{ success: boolean }>(`${this.config.apiBaseUrl}/move-employee`, {
        employee_id: employeeId,
        new_manager_id: newManagerId
      });
      return response.data;
    } catch (error) {
      console.error('Error moving employee:', error);

      // Si le mode fallback est activé, simuler une opération réussie
      if (this.config.fallbackEnabled) {
        console.log('Using fallback mode for moving employee');
        return { success: true };
      }

      throw error;
    }
  },

  /**
   * Récupère les statistiques de l'organisation
   * @returns Statistiques de l'organisation
   */
  async getOrganizationStats() {
    try {
      const response = await ApiService.get(`${this.config.apiBaseUrl}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching organization stats:', error);

      // Si le mode fallback est activé, retourner des données simulées
      if (this.config.fallbackEnabled) {
        console.log('Using fallback data for organization stats');
        return {
          totalEmployees: 15,
          totalDepartments: 5,
          averageTeamSize: 3,
          managerRatio: 0.33,
          departmentDistribution: {
            'Direction Générale': 1,
            'Ressources Humaines': 3,
            'Finance': 3,
            'Technique': 3,
            'Marketing': 3
          }
        };
      }

      throw error;
    }
  },

  /**
   * Exporte l'organigramme au format demandé
   * @param format Format d'exportation (pdf, png, svg)
   * @returns URL du fichier exporté
   */
  async exportOrgChart(format: 'pdf' | 'png' | 'svg'): Promise<string> {
    try {
      const response = await ApiService.get<{ url: string }>(`${this.config.apiBaseUrl}/export/${format}`);
      return response.data.url;
    } catch (error) {
      console.error(`Error exporting org chart as ${format}:`, error);

      // Si le mode fallback est activé, retourner une URL simulée
      if (this.config.fallbackEnabled) {
        console.log(`Using fallback mode for exporting org chart as ${format}`);
        return `/mock-exports/organization-chart.${format}`;
      }

      throw error;
    }
  }
};

export default organizationApiService;
