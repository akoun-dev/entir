import { ImportMapping, ImportConfig, ImportResult } from '../hooks/useETLImport';
import { employeeService } from './index';

/**
 * Service pour la gestion des opérations ETL (Extract, Transform, Load)
 * 
 * Ce service fournit des fonctionnalités pour importer des données à partir de fichiers
 * CSV, Excel, etc. dans le système.
 */
class ETLService {
  private abortController: AbortController | null = null;
  
  /**
   * Parse un fichier CSV ou Excel
   * @param file Fichier à parser
   * @returns Données parsées (en-têtes et lignes)
   */
  async parseFile(file: File): Promise<{ headers: string[], data: any[] }> {
    return new Promise((resolve, reject) => {
      // Vérifier le type de fichier
      if (file.name.endsWith('.csv')) {
        this.parseCSV(file)
          .then(resolve)
          .catch(reject);
      } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        this.parseExcel(file)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error('Format de fichier non pris en charge. Veuillez utiliser un fichier CSV ou Excel.'));
      }
    });
  }
  
  /**
   * Parse un fichier CSV
   * @param file Fichier CSV
   * @returns Données parsées (en-têtes et lignes)
   */
  private async parseCSV(file: File): Promise<{ headers: string[], data: any[] }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          if (!event.target || !event.target.result) {
            throw new Error('Erreur lors de la lecture du fichier');
          }
          
          const csv = event.target.result as string;
          const lines = csv.split('\n');
          
          if (lines.length === 0) {
            throw new Error('Le fichier est vide');
          }
          
          // Extraire les en-têtes
          const headers = lines[0].split(',').map(header => header.trim());
          
          // Extraire les données
          const data = [];
          
          for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            
            if (!line) continue;
            
            const values = line.split(',');
            const row: Record<string, string> = {};
            
            headers.forEach((header, index) => {
              row[header] = values[index] ? values[index].trim() : '';
            });
            
            data.push(row);
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
   * Parse un fichier Excel
   * @param file Fichier Excel
   * @returns Données parsées (en-têtes et lignes)
   */
  private async parseExcel(file: File): Promise<{ headers: string[], data: any[] }> {
    // Simuler le parsing d'un fichier Excel
    // Dans une implémentation réelle, il faudrait utiliser une bibliothèque comme xlsx
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        try {
          // Simuler des données Excel
          const headers = ['Nom', 'Email', 'Téléphone', 'Poste', 'Département', 'Responsable'];
          const data = [
            {
              'Nom': 'Jean Dupont',
              'Email': 'jean.dupont@example.com',
              'Téléphone': '+33123456789',
              'Poste': 'Développeur',
              'Département': 'Technique',
              'Responsable': 'Marie Martin'
            },
            {
              'Nom': 'Sophie Lefebvre',
              'Email': 'sophie.lefebvre@example.com',
              'Téléphone': '+33987654321',
              'Poste': 'Designer',
              'Département': 'Marketing',
              'Responsable': 'Pierre Dubois'
            }
          ];
          
          resolve({ headers, data });
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Erreur lors de la lecture du fichier Excel'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  }
  
  /**
   * Importe des employés à partir de données parsées
   * @param data Données à importer
   * @param mappings Configuration de mappage
   * @param config Configuration d'importation
   * @param progressCallback Fonction de callback pour le suivi de la progression
   * @returns Résultat de l'importation
   */
  async importEmployees(
    data: any[],
    mappings: ImportMapping[],
    config: ImportConfig,
    progressCallback?: (progress: number) => void
  ): Promise<ImportResult> {
    // Créer un nouvel AbortController pour permettre l'annulation
    this.abortController = new AbortController();
    
    const result: ImportResult = {
      success: true,
      total: data.length,
      created: 0,
      updated: 0,
      skipped: 0,
      failed: 0,
      errors: []
    };
    
    // Transformer les données selon le mappage
    const transformedData = data.map(row => {
      const transformedRow: Record<string, any> = {};
      
      mappings.forEach(mapping => {
        if (mapping.targetField && mapping.sourceField) {
          transformedRow[mapping.targetField] = row[mapping.sourceField];
        }
      });
      
      return transformedRow;
    });
    
    // Traiter chaque ligne
    for (let i = 0; i < transformedData.length; i++) {
      // Vérifier si l'importation a été annulée
      if (this.abortController.signal.aborted) {
        result.success = false;
        break;
      }
      
      const row = transformedData[i];
      
      try {
        // Vérifier si l'employé existe déjà
        let existingEmployee = null;
        
        if (config.updateExisting && row[config.identifierField]) {
          try {
            // Simuler la recherche d'un employé existant
            // Dans une implémentation réelle, il faudrait utiliser un service pour rechercher l'employé
            if (config.identifierField === 'email') {
              const employees = await employeeService.getAll();
              existingEmployee = employees.find(emp => emp.work_email === row[config.identifierField]);
            }
          } catch (error) {
            console.error('Erreur lors de la recherche de l\'employé existant:', error);
          }
        }
        
        if (existingEmployee) {
          // Mettre à jour l'employé existant
          if (config.updateExisting) {
            await employeeService.updateEmployee(existingEmployee.id, row);
            result.updated++;
          } else {
            result.skipped++;
          }
        } else {
          // Créer un nouvel employé
          if (config.createMissing) {
            await employeeService.createEmployee(row);
            result.created++;
          } else {
            result.skipped++;
          }
        }
      } catch (error) {
        result.failed++;
        result.errors?.push({
          row: i + 1,
          message: error instanceof Error ? error.message : 'Erreur inconnue'
        });
      }
      
      // Mettre à jour la progression
      if (progressCallback) {
        progressCallback(Math.round(((i + 1) / transformedData.length) * 100));
      }
    }
    
    // Mettre à jour le statut de succès
    result.success = result.failed === 0;
    
    return result;
  }
  
  /**
   * Annule l'importation en cours
   */
  cancelImport(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }
  
  /**
   * Génère un rapport d'erreurs
   * @param importResults Résultats de l'importation
   * @returns Blob contenant le rapport d'erreurs
   */
  generateErrorReport(importResults: ImportResult): Blob {
    const headers = 'Ligne,Champ,Valeur,Message\n';
    
    const rows = importResults.errors?.map(error => {
      const row = error.row || '';
      const field = error.field || '';
      const value = error.value || '';
      const message = error.message || '';
      
      return `${row},${field},${value},"${message}"`;
    }).join('\n') || '';
    
    const csv = headers + rows;
    
    return new Blob([csv], { type: 'text/csv' });
  }
}

export default new ETLService();
