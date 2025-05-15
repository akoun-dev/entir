
import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import etlService from '../services/etlService';
import organizationApiService from '../services/organizationApiService';

// Define interfaces for import configuration and results
export interface ImportMapping {
  sourceField: string;
  targetField: string;
}

export interface ImportConfig {
  createMissing: boolean;
  updateExisting: boolean;
  identifierField: string;
}

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

export const EMPLOYEE_FIELDS = [
  { id: 'name', label: 'Nom', required: true },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Téléphone' },
  { id: 'position', label: 'Poste' },
  { id: 'department', label: 'Département' },
  { id: 'manager', label: 'Responsable' }
];

export const useETLImport = () => {
  const [file, setFile] = useState<File | null>(null);
  const [headerPreview, setHeaderPreview] = useState<string[]>([]);
  const [dataPreview, setDataPreview] = useState<string[][]>([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [mappings, setMappings] = useState<ImportMapping[]>([]);
  const [config, setConfig] = useState<ImportConfig>({
    createMissing: true,
    updateExisting: true,
    identifierField: 'email',
  });
  const [importProgress, setImportProgress] = useState(0);
  const [importStatus, setImportStatus] = useState<'idle' | 'processing' | 'success' | 'error' | 'cancelled'>('idle');
  const [importResults, setImportResults] = useState<ImportResult>({
    success: false,
    total: 0,
    created: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
    errors: []
  });
  const [isApiMode, setIsApiMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [processingFile, setProcessingFile] = useState(false);

  // Check API mode on mount
  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const apiStatus = await organizationApiService.testConnection();
        setIsApiMode(apiStatus);
      } catch (error) {
        console.error("Error checking API status:", error);
        setIsApiMode(false);
      }
    };
    
    checkApiStatus();
  }, []);

  // Handle file selection and parsing
  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) return;
    
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setProcessingFile(true);
    
    try {
      toast(`Analyse du fichier: ${selectedFile.name}`, {
        description: 'Veuillez patienter...'
      });
      
      // Use our ETL service to parse the file
      const { headers, data } = await etlService.parseFile(selectedFile);
      
      if (!headers.length) {
        throw new Error("Aucun en-tête trouvé dans le fichier");
      }
      
      setHeaderPreview(headers);
      setParsedData(data);
      
      // Show preview of first 5 rows
      const previewData = data.slice(0, 5).map((row: any) => 
        headers.map(header => row[header] || '')
      );
      setDataPreview(previewData);
      
      // Create initial field mappings
      const initialMappings: ImportMapping[] = headers.map(header => {
        // Try to match headers to our fields
        const matchedField = EMPLOYEE_FIELDS.find(field => 
          field.id.toLowerCase() === header.toLowerCase() || 
          field.label.toLowerCase() === header.toLowerCase()
        );
        
        return {
          sourceField: header,
          targetField: matchedField ? matchedField.id : '',
        };
      });
      
      setMappings(initialMappings);
      
      // Advance to mapping tab
      setActiveTab('mapping');
    } catch (error) {
      console.error("Error processing file:", error);
      toast(`Erreur lors de l'analyse du fichier: ${error instanceof Error ? error.message : "Format invalide"}`, {
        description: 'Vérifiez que le format de votre fichier est correct'
      });
    } finally {
      setProcessingFile(false);
    }
  }, []);

  // Update field mapping
  const handleMappingChange = useCallback((sourceField: string, targetField: string) => {
    setMappings(current => 
      current.map(mapping => 
        mapping.sourceField === sourceField ? { ...mapping, targetField } : mapping
      )
    );
  }, []);

  // Update import configuration
  const handleConfigChange = useCallback((key: keyof ImportConfig, value: boolean | string) => {
    setConfig(current => ({
      ...current,
      [key]: value
    }));
  }, []);

  // Validate mappings before proceeding
  const validateMappings = useCallback(() => {
    // Check if required fields are mapped
    const hasName = mappings.some(m => m.targetField === 'name');
    
    if (!hasName) {
      toast(`Le champ 'Nom' est requis pour l'import`);
      return false;
    }
    
    // Check if identifier field is mapped when updating existing
    if (config.updateExisting) {
      const hasIdentifier = mappings.some(m => m.targetField === config.identifierField);
      
      if (!hasIdentifier) {
        toast(`Le champ identifiant '${config.identifierField}' est requis pour la mise à jour des employés existants`);
        return false;
      }
    }
    
    return true;
  }, [mappings, config]);

  // Start the import process
  const handleImport = useCallback(async () => {
    if (!validateMappings() || !parsedData.length) return;
    
    setImportStatus('processing');
    setImportProgress(0);
    setActiveTab('import');
    
    try {
      // Start the actual import using ETL service
      const results = await etlService.importEmployees(
        parsedData,
        mappings,
        config,
        (progress: number) => {
          setImportProgress(progress);
        }
      );
      
      setImportResults(results);
      setImportStatus(results.success ? 'success' : 'error');
      
      // Show toast with results
      if (results.success) {
        toast(`Import terminé: ${results.created} créés, ${results.updated} mis à jour`, {
          description: 'Les données ont été importées avec succès',
        });
      } else {
        toast(`Import terminé avec ${results.errors?.length || 0} erreurs`, {
          description: 'Certaines données n\'ont pas pu être importées'
        });
      }
    } catch (error) {
      console.error("Import error:", error);
      setImportStatus('error');
      setImportResults({
        success: false,
        total: parsedData.length,
        created: 0,
        updated: 0,
        skipped: 0,
        failed: parsedData.length,
        errors: [{
          row: 0,
          message: `Erreur lors de l'import: ${error instanceof Error ? error.message : String(error)}`
        }]
      });
      
      toast(`Erreur lors de l'import`, {
        description: error instanceof Error ? error.message : 'Une erreur inattendue est survenue'
      });
    }
  }, [parsedData, mappings, config, validateMappings]);

  // Cancel import operation
  const handleCancelImport = useCallback(() => {
    etlService.cancelImport();
    setImportStatus('cancelled');
    toast(`Import annulé`, {
      description: 'L\'opération d\'import a été annulée'
    });
  }, []);

  // Reset the import form
  const resetImport = useCallback(() => {
    setFile(null);
    setHeaderPreview([]);
    setDataPreview([]);
    setParsedData([]);
    setMappings([]);
    setImportProgress(0);
    setImportStatus('idle');
    setActiveTab('upload');
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  // Download error report
  const downloadErrorReport = useCallback(() => {
    if (importResults.errors && importResults.errors.length > 0) {
      const blob = etlService.generateErrorReport(importResults);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rapport-erreurs-import-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }, [importResults]);

  // Download template for data import
  const downloadTemplate = useCallback(() => {
    const headers = EMPLOYEE_FIELDS.map(f => f.label).join(',');
    const template = `${headers}\nJean Dupont,jean.dupont@example.com,+33123456789,Développeur,Technique,Marie Martin`;
    
    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modele_import_employes.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return {
    // State
    file,
    headerPreview,
    dataPreview,
    activeTab,
    setActiveTab,
    mappings,
    config,
    importProgress,
    importStatus,
    importResults,
    isApiMode,
    fileInputRef,
    parsedData,
    processingFile,
    
    // Actions
    handleFileChange,
    handleMappingChange,
    handleConfigChange,
    validateMappings,
    handleImport,
    handleCancelImport,
    resetImport,
    downloadErrorReport,
    downloadTemplate,
  };
};
