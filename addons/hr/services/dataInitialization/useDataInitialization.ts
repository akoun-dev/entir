
import { useState, useCallback } from 'react';
import { useToast } from '../../../../src/hooks/use-toast';
import DataInitializationService, { DataExportOptions, DataImportResult, InitializationData } from './DataInitializationService';

export const useDataInitialization = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [lastImportResult, setLastImportResult] = useState<DataImportResult | null>(null);
  
  const service = DataInitializationService.getInstance();

  /**
   * Vérifie si des données importées sont disponibles
   */
  const hasImportedData = useCallback(() => {
    return service.hasImportedData();
  }, [service]);
  
  /**
   * Récupère la date du dernier import
   */
  const getLastImportDate = useCallback(() => {
    return service.getLastImportDate();
  }, [service]);
  
  /**
   * Génère un export des données actuelles
   */
  const generateExportData = useCallback((options: DataExportOptions = {}) => {
    try {
      return service.exportData(options);
    } catch (error) {
      toast({
        title: "Erreur d'exportation",
        description: `Une erreur est survenue : ${(error as Error).message}`,
        variant: "destructive"
      });
      return null;
    }
  }, [service, toast]);
  
  /**
   * Télécharge les données exportées sous forme de fichier
   */
  const downloadExport = useCallback((data: InitializationData) => {
    try {
      service.downloadExportFile(data);
      toast({
        title: "Exportation réussie",
        description: "Le fichier a été généré et téléchargé avec succès."
      });
    } catch (error) {
      toast({
        title: "Erreur de téléchargement",
        description: `Une erreur est survenue : ${(error as Error).message}`,
        variant: "destructive"
      });
    }
  }, [service, toast]);
  
  /**
   * Exporte les données et déclenche le téléchargement
   */
  const exportAndDownload = useCallback((options: DataExportOptions = {}) => {
    const exportData = generateExportData(options);
    if (exportData) {
      downloadExport(exportData);
    }
  }, [generateExportData, downloadExport]);
  
  /**
   * Exporte les données directement (wrapper autour de service.exportData)
   */
  const exportData = useCallback((options: DataExportOptions = {}) => {
    const data = generateExportData(options);
    if (data) {
      downloadExport(data);
    }
  }, [generateExportData, downloadExport]);
  
  /**
   * Importe des données à partir d'un fichier
   */
  const importFromFile = useCallback(async (file: File): Promise<DataImportResult> => {
    setIsLoading(true);
    
    try {
      const text = await file.text();
      const result = await service.importData(text);
      
      setLastImportResult(result);
      
      if (result.success) {
        toast({
          title: "Import réussi",
          description: `${result.imported} entités ont été importées avec succès.`
        });
      } else {
        toast({
          title: "Import échoué",
          description: `${result.errors.length} erreurs rencontrées.`,
          variant: "destructive"
        });
      }
      
      return result;
    } catch (error) {
      const result = {
        success: false,
        message: `Erreur lors de l'importation : ${(error as Error).message}`,
        total: 0,
        imported: 0,
        skipped: 0,
        errors: [{
          entity: 'global',
          message: `Erreur lors de l'importation : ${(error as Error).message}`
        }]
      };
      
      setLastImportResult(result);
      
      toast({
        title: "Erreur lors de l'import",
        description: (error as Error).message,
        variant: "destructive"
      });
      
      return result;
    } finally {
      setIsLoading(false);
    }
  }, [service, toast]);
  
  /**
   * Wrapper around importFromFile for DataInitializationPanel
   */
  const importData = importFromFile;
  
  /**
   * Efface les données importées
   */
  const clearImportedData = useCallback(() => {
    service.clearImportedData();
    toast({
      title: "Données effacées",
      description: "Les données importées ont été supprimées. Le système utilise maintenant les données simulées."
    });
  }, [service, toast]);
  
  return {
    hasImportedData,
    getLastImportDate,
    generateExportData,
    downloadExport,
    exportAndDownload,
    exportData,
    importFromFile,
    importData,
    clearImportedData,
    isLoading,
    lastImportResult
  };
};
