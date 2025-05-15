
import { Employee } from '../../types/employee';
import { Department } from '../../types/department';
import { JobOffer, JobApplication, RecruitmentStage } from '../../types/recruitment';
import { Leave, LeaveType } from '../../types/leave';
import { OrgChartPerson, OrgChartDepartment } from '../../types/organization';
import { TrainingCourse, TrainingSession, TrainerProfile } from '../../types/training';
import { jobOffers, jobApplications, recruitmentStages } from '../../data/recruitments';
import { useToast } from '../../../../src/hooks/use-toast';

export interface DataExportOptions {
  includeEmployees?: boolean;
  includeDepartments?: boolean;
  includeRecruitment?: boolean;
  includeLeaves?: boolean;
  includeTraining?: boolean;
  includeOrganization?: boolean;
  format?: 'json' | 'csv';
}

export interface DataImportResult {
  success: boolean;
  message: string;
  total: number;
  imported: number;
  skipped: number;
  errors: Array<{
    entity: string;
    id?: string;
    message: string;
  }>;
}

export interface InitializationData {
  version: string;
  timestamp: string;
  employees?: Employee[];
  departments?: Department[];
  recruitment?: {
    jobOffers?: JobOffer[];
    jobApplications?: JobApplication[];
    recruitmentStages?: RecruitmentStage[];
  };
  leaves?: {
    leaves?: Leave[];
    leaveTypes?: LeaveType[];
  };
  training?: {
    courses?: TrainingCourse[];
    sessions?: TrainingSession[];
    trainers?: TrainerProfile[];
  };
  organization?: {
    persons?: OrgChartPerson[];
    departments?: OrgChartDepartment[];
  };
}

class DataInitializationService {
  private static instance: DataInitializationService;
  private initialized = false;
  private importedData: InitializationData | null = null;
  private lastImportDate: string | null = null;

  /**
   * Vérifie si des données importées sont disponibles
   */
  public hasImportedData(): boolean {
    this.loadFromStorage();
    return this.importedData !== null;
  }

  /**
   * Récupère la date du dernier import
   */
  public getLastImportDate(): string | null {
    this.loadFromStorage();
    return this.lastImportDate;
  }

  /**
   * Récupère les données importées pour un type spécifique
   */
  public getImportedData<T>(dataType: keyof InitializationData): T | null {
    this.loadFromStorage();
    
    if (!this.importedData || !this.importedData[dataType]) {
      return null;
    }
    
    return this.importedData[dataType] as unknown as T;
  }

  /**
   * Singleton pattern
   */
  public static getInstance(): DataInitializationService {
    if (!DataInitializationService.instance) {
      DataInitializationService.instance = new DataInitializationService();
    }
    return DataInitializationService.instance;
  }

  /**
   * Initialise le service
   */
  public initialize(): void {
    if (this.initialized) return;
    
    this.loadFromStorage();
    this.initialized = true;
  }

  /**
   * Exporte les données actuelles selon les options spécifiées
   */
  public exportData(options: DataExportOptions = {}): InitializationData {
    const data: InitializationData = {
      version: '1.0',
      timestamp: new Date().toISOString(),
    };

    // Inclure les données de recrutement si demandé
    if (options.includeRecruitment) {
      data.recruitment = {
        jobOffers: [...jobOffers],
        jobApplications: [...jobApplications],
        recruitmentStages: [...recruitmentStages]
      };
    }

    // Autres modules à ajouter de manière similaire...
    // Par exemple, pour les employés, départements, etc.

    return data;
  }

  /**
   * Génère et télécharge un fichier d'exportation
   */
  public downloadExportFile(data: InitializationData): void {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `hr-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Valide les données importées
   */
  public validateImportData(data: any): boolean {
    // Vérification de la version
    if (!data.version || !data.timestamp) {
      return false;
    }

    // Validation de base de la structure
    // Une validation plus approfondie serait nécessaire en production
    return true;
  }

  /**
   * Importe des données à partir d'un fichier JSON
   */
  public async importData(jsonData: string): Promise<DataImportResult> {
    try {
      const data = JSON.parse(jsonData) as InitializationData;
      
      if (!this.validateImportData(data)) {
        return {
          success: false,
          message: 'Format de fichier invalide ou incompatible',
          total: 0,
          imported: 0,
          skipped: 0,
          errors: [{
            entity: 'global',
            message: 'Format de fichier invalide ou incompatible'
          }]
        };
      }

      // Sauvegarde des données importées
      this.importedData = data;
      this.lastImportDate = new Date().toISOString();
      this.saveToStorage();

      return {
        success: true,
        message: `${this.countTotalEntities(data)} entités importées avec succès`,
        total: this.countTotalEntities(data),
        imported: this.countTotalEntities(data),
        skipped: 0,
        errors: []
      };
    } catch (error) {
      return {
        success: false,
        message: `Erreur lors du parsing du JSON: ${(error as Error).message}`,
        total: 0,
        imported: 0,
        skipped: 0,
        errors: [{
          entity: 'global',
          message: `Erreur lors du parsing du JSON: ${(error as Error).message}`
        }]
      };
    }
  }

  /**
   * Compte le nombre total d'entités dans les données
   */
  private countTotalEntities(data: InitializationData): number {
    let count = 0;
    
    if (data.employees) count += data.employees.length;
    if (data.departments) count += data.departments.length;
    
    if (data.recruitment) {
      if (data.recruitment.jobOffers) count += data.recruitment.jobOffers.length;
      if (data.recruitment.jobApplications) count += data.recruitment.jobApplications.length;
      if (data.recruitment.recruitmentStages) count += data.recruitment.recruitmentStages.length;
    }
    
    // Compter les autres types d'entités...
    
    return count;
  }

  /**
   * Efface les données importées
   */
  public clearImportedData(): void {
    this.importedData = null;
    localStorage.removeItem('hr_imported_data');
  }

  /**
   * Sauvegarde les données dans le stockage local
   */
  private saveToStorage(): void {
    if (this.importedData) {
      localStorage.setItem('hr_imported_data', JSON.stringify({
        data: this.importedData,
        lastImportDate: this.lastImportDate
      }));
    }
  }

  /**
   * Charge les données depuis le stockage local
   */
  private loadFromStorage(): void {
    const storedData = localStorage.getItem('hr_imported_data');
    
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        this.importedData = parsed.data;
        this.lastImportDate = parsed.lastImportDate;
      } catch (error) {
        console.error('Erreur lors du chargement des données importées:', error);
        this.importedData = null;
        this.lastImportDate = null;
      }
    }
  }
}

export default DataInitializationService;
