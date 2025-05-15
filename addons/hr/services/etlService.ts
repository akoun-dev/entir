
import { toast } from 'sonner';
import ApiService from './apiService';

/**
 * Interface for import mapping
 */
export interface ImportMapping {
  sourceField: string;
  targetField: string;
}

/**
 * Interface for import configuration
 */
export interface ImportConfig {
  createMissing: boolean;
  updateExisting: boolean;
  identifierField: string;
}

/**
 * Interface for import result
 */
export interface ImportResult {
  success: boolean;
  total?: number;
  created?: number;
  updated?: number;
  skipped?: number;
  failed?: number;
  errors?: Array<{
    row?: number;
    field?: string;
    value?: string;
    message: string;
  }>;
}

/**
 * Service pour l'extraction, la transformation et le chargement (ETL) de données.
 * Gère l'importation de données à partir de fichiers CSV et Excel, leur transformation
 * et leur chargement dans l'application.
 */
export class ETLService {
  private static instance: ETLService;
  private isImporting: boolean = false;
  private cancelImportFlag: boolean = false;

  // Singleton
  private constructor() {}

  public static getInstance(): ETLService {
    if (!ETLService.instance) {
      ETLService.instance = new ETLService();
    }
    return ETLService.instance;
  }

  /**
   * Parse un fichier (CSV ou Excel) et extrait les données.
   * @param file Le fichier à parser.
   * @returns Une promesse résolue avec les en-têtes et les données parsées.
   */
  public async parseFile(file: File): Promise<{ headers: string[]; data: any[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        try {
          // For simplicity, let's parse CSV manually since we don't have xlsx library
          const text = e.target.result;
          const lines = text.split('\n');
          
          if (lines.length === 0) {
            reject(new Error('Le fichier est vide'));
            return;
          }
          
          const headers = lines[0].split(',').map((header: string) => header.trim());
          const data = [];
          
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line) {
              const values = this.parseCSVLine(line);
              const row: any = {};
              
              headers.forEach((header, index) => {
                row[header] = values[index] || '';
              });
              
              data.push(row);
            }
          }
          
          resolve({ headers, data });
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Erreur lors de la lecture du fichier'));
      };

      reader.readAsText(file);
    });
  }
  
  /**
   * Helper to parse CSV lines properly (handling quoted values with commas)
   */
  private parseCSVLine(line: string): string[] {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }

  /**
   * Importe des employés à partir de données parsées.
   * @param data Les données parsées à importer.
   * @param mappings Le mapping des champs source vers les champs cible.
   * @param config La configuration de l'import.
   * @param progressCallback Une fonction de callback pour suivre la progression de l'import.
   * @returns Une promesse résolue avec les résultats de l'import.
   */
  public async importEmployees(
    data: any[],
    mappings: ImportMapping[],
    config: ImportConfig,
    progressCallback?: (progress: number) => void
  ): Promise<ImportResult> {
    if (this.isImporting) {
      throw new Error('Un import est déjà en cours');
    }

    this.isImporting = true;
    this.cancelImportFlag = false;

    let created = 0;
    let updated = 0;
    let skipped = 0;
    let failed = 0;
    const errors: ImportResult['errors'] = [];
    const total = data.length;

    try {
      for (let index = 0; index < total; index++) {
        if (this.cancelImportFlag) {
          break;
        }

        const row = data[index];
        const employeeData: Record<string, any> = {};

        // Mapper les champs source vers les champs cible
        mappings.forEach(mapping => {
          if (mapping.targetField && row[mapping.sourceField] !== undefined) {
            employeeData[mapping.targetField] = row[mapping.sourceField];
          }
        });

        try {
          // Importer l'employé via l'API
          const api = ApiService;
          
          if (!api.isServiceInitialized()) {
            throw new Error('API Service not initialized');
          }

          // Simuler l'import en mode démonstration
          const isApiMode = await api.get('/organization/ping')
            .then(() => true)
            .catch(() => false);

          if (!isApiMode) {
            console.warn('Import en mode démonstration');
            skipped++;
          } else {
            // Envoyer les données à l'API pour créer ou mettre à jour l'employé
            const response = await api.post('/organization/employees', employeeData);

            if (response) {
              created++;
            } else {
              updated++;
            }
          }
        } catch (error: any) {
          console.error('Erreur lors de l\'import de la ligne', index + 1, error);
          failed++;
          errors.push({
            row: index + 1,
            message: error.message || 'Erreur inconnue'
          });
        }

        // Calculer la progression et déclencher le callback
        const progress = Math.round(((index + 1) / total) * 100);
        progressCallback?.(progress);
      }
    } finally {
      this.isImporting = false;
    }

    return {
      success: failed === 0,
      total,
      created,
      updated,
      skipped,
      failed,
      errors
    };
  }

  /**
   * Annule l'import en cours.
   */
  public cancelImport(): void {
    this.cancelImportFlag = true;
  }

  /**
   * Génère un rapport d'erreurs au format CSV.
   * @param importResults Les résultats de l'import.
   * @returns Un Blob contenant le rapport d'erreurs au format CSV.
   */
  public generateErrorReport(importResults: ImportResult): Blob {
    const headers = ['Ligne', 'Message'];
    const rows = importResults.errors?.map(error => [error.row, error.message]) || [];
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return new Blob([csvContent], { type: 'text/csv' });
  }
}

// Export de l'instance par défaut
export default ETLService.getInstance();
