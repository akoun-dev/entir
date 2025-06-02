import { api } from '../../../src/services/api';
import { useState, useCallback } from 'react';

/**
 * Interface pour les options d'initialisation des données
 */
interface InitializationOptions {
  departments?: boolean;
  employees?: boolean;
  positions?: boolean;
  contracts?: boolean;
  leaves?: boolean;
  clearExisting?: boolean;
  sampleSize?: 'small' | 'medium' | 'large';
}

/**
 * Interface pour les résultats d'initialisation
 */
interface InitializationResult {
  success: boolean;
  departments?: number;
  employees?: number;
  positions?: number;
  contracts?: number;
  leaves?: number;
  errors?: string[];
}

/**
 * Service pour l'initialisation des données
 *
 * Ce service fournit des fonctionnalités pour initialiser les données du module RH
 * avec des données de démonstration ou pour réinitialiser les données existantes.
 */
const dataInitializationService = {
  /**
   * Initialise les données du module RH
   * @param options Options d'initialisation
   * @returns Résultat de l'initialisation
   */
  async initializeData(options: InitializationOptions): Promise<InitializationResult> {
    try {
      const response = await api.post<InitializationResult>('/hr/initialize', options);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation des données:', error);
      return {
        success: false,
        errors: [error instanceof Error ? error.message : 'Erreur inconnue']
      };
    }
  },

  /**
   * Réinitialise les données du module RH
   * @returns Résultat de la réinitialisation
   */
  async resetData(): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await api.post<{ success: boolean; message?: string }>('/hr/reset', {});
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la réinitialisation des données:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Erreur inconnue'
      };
    }
  },

  /**
   * Vérifie si des données existent déjà
   * @returns Informations sur les données existantes
   */
  async checkExistingData(): Promise<{
    hasData: boolean;
    counts: {
      departments: number;
      employees: number;
      positions: number;
      contracts: number;
      leaves: number;
    }
  }> {
    try {
      const response = await api.get<{
        hasData: boolean;
        counts: {
          departments: number;
          employees: number;
          positions: number;
          contracts: number;
          leaves: number;
        }
      }>('/hr/data-status');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la vérification des données existantes:', error);
      return {
        hasData: false,
        counts: {
          departments: 0,
          employees: 0,
          positions: 0,
          contracts: 0,
          leaves: 0
        }
      };
    }
  }
};

/**
 * Hook pour utiliser le service d'initialisation des données
 */
export const useDataInitialization = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InitializationResult | null>(null);
  const [existingData, setExistingData] = useState<{
    hasData: boolean;
    counts: {
      departments: number;
      employees: number;
      positions: number;
      contracts: number;
      leaves: number;
    }
  } | null>(null);

  // Clé pour le stockage local
  const IMPORT_DATA_KEY = 'hr_imported_data';
  const IMPORT_DATE_KEY = 'hr_import_date';

  /**
   * Initialise les données du module RH
   * @param options Options d'initialisation
   */
  const initializeData = useCallback(async (options: InitializationOptions) => {
    setLoading(true);
    setError(null);

    try {
      const result = await dataInitializationService.initializeData(options);
      setResult(result);

      if (!result.success) {
        setError('Erreur lors de l\'initialisation des données');
      }

      return result;
    } catch (err) {
      console.error('Erreur lors de l\'initialisation des données:', err);
      setError('Erreur lors de l\'initialisation des données');
      return {
        success: false,
        errors: [err instanceof Error ? err.message : 'Erreur inconnue']
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Réinitialise les données du module RH
   */
  const resetData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await dataInitializationService.resetData();

      if (!result.success) {
        setError(result.message || 'Erreur lors de la réinitialisation des données');
      }

      return result;
    } catch (err) {
      console.error('Erreur lors de la réinitialisation des données:', err);
      setError('Erreur lors de la réinitialisation des données');
      return {
        success: false,
        message: err instanceof Error ? err.message : 'Erreur inconnue'
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Vérifie si des données existent déjà
   */
  const checkExistingData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await dataInitializationService.checkExistingData();
      setExistingData(data);
      return data;
    } catch (err) {
      console.error('Erreur lors de la vérification des données existantes:', err);
      setError('Erreur lors de la vérification des données existantes');
      return {
        hasData: false,
        counts: {
          departments: 0,
          employees: 0,
          positions: 0,
          contracts: 0,
          leaves: 0
        }
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Exporte les données du module RH
   * @param options Options d'exportation
   */
  const exportData = useCallback((options: {
    includeEmployees: boolean;
    includeDepartments: boolean;
    includeRecruitment: boolean;
    includeTraining: boolean;
    [key: string]: boolean;
  }) => {
    // Simuler l'exportation des données
    setTimeout(() => {
      // Créer un objet avec les données à exporter
      const exportData = {
        metadata: {
          version: '1.0',
          date: new Date().toISOString(),
          options
        },
        data: {
          employees: options.includeEmployees ? [
            { id: 1, name: 'Jean Dupont', email: 'jean.dupont@example.com' },
            { id: 2, name: 'Marie Martin', email: 'marie.martin@example.com' }
          ] : [],
          departments: options.includeDepartments ? [
            { id: 1, name: 'Ressources Humaines', code: 'RH' },
            { id: 2, name: 'Informatique', code: 'IT' }
          ] : [],
          recruitment: options.includeRecruitment ? {
            jobOffers: [
              { id: 1, title: 'Développeur Full Stack', department_id: 2 }
            ],
            applications: [
              { id: 1, job_offer_id: 1, candidate_name: 'Paul Durand' }
            ]
          } : null,
          training: options.includeTraining ? {
            courses: [
              { id: 1, title: 'Introduction à React', duration: 16 }
            ],
            sessions: [
              { id: 1, course_id: 1, start_date: '2023-09-15' }
            ]
          } : null
        }
      };

      // Convertir en JSON
      const jsonData = JSON.stringify(exportData, null, 2);

      // Créer un blob et télécharger
      const blob = new Blob([jsonData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hr_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 500);
  }, []);

  /**
   * Importe des données dans le module RH
   * @param file Fichier à importer
   */
  const importData = useCallback(async (file: File): Promise<{
    success: boolean;
    message?: string;
    total: number;
    imported: number;
    skipped: number;
    errors: Array<{
      row?: number;
      field?: string;
      message: string;
    }>;
  }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          if (!event.target || !event.target.result) {
            throw new Error('Erreur lors de la lecture du fichier');
          }

          const jsonData = event.target.result as string;
          const importData = JSON.parse(jsonData);

          // Vérifier la structure du fichier
          if (!importData.metadata || !importData.data) {
            throw new Error('Format de fichier invalide');
          }

          // Simuler l'importation des données
          setTimeout(() => {
            // Sauvegarder les données importées dans le localStorage
            localStorage.setItem(IMPORT_DATA_KEY, jsonData);
            localStorage.setItem(IMPORT_DATE_KEY, new Date().toISOString());

            // Calculer les statistiques
            const totalEmployees = importData.data.employees?.length || 0;
            const totalDepartments = importData.data.departments?.length || 0;
            const totalRecruitment =
              (importData.data.recruitment?.jobOffers?.length || 0) +
              (importData.data.recruitment?.applications?.length || 0);
            const totalTraining =
              (importData.data.training?.courses?.length || 0) +
              (importData.data.training?.sessions?.length || 0);

            const total = totalEmployees + totalDepartments + totalRecruitment + totalTraining;

            // Résultat de l'importation
            const result = {
              success: true,
              message: `${total} éléments importés avec succès`,
              total,
              imported: total,
              skipped: 0,
              errors: []
            };

            resolve(result);
          }, 1000);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => {
        reject(new Error('Erreur lors de la lecture du fichier'));
      };

      reader.readAsText(file);
    });
  }, []);

  /**
   * Vérifie si des données ont été importées
   */
  const hasImportedData = useCallback(() => {
    return !!localStorage.getItem(IMPORT_DATA_KEY);
  }, []);

  /**
   * Récupère la date de la dernière importation
   */
  const getLastImportDate = useCallback(() => {
    return localStorage.getItem(IMPORT_DATE_KEY);
  }, []);

  /**
   * Efface les données importées
   */
  const clearImportedData = useCallback(() => {
    localStorage.removeItem(IMPORT_DATA_KEY);
    localStorage.removeItem(IMPORT_DATE_KEY);
  }, []);

  return {
    loading,
    error,
    result,
    existingData,
    initializeData,
    resetData,
    checkExistingData,
    exportData,
    importData,
    hasImportedData,
    getLastImportDate,
    clearImportedData
  };
};

export default dataInitializationService;
