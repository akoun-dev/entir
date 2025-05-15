
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../src/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../../src/components/ui/accordion';
import { Button } from '../../../../src/components/ui/button';
import { Input } from '../../../../src/components/ui/input';
import { Switch } from '../../../../src/components/ui/switch';
import { Label } from '../../../../src/components/ui/label';
import { Badge } from '../../../../src/components/ui/badge';
import { FileUp, Download, Check, Save, Database, Trash } from 'lucide-react';
import { useDataInitialization, DataExportOptions, DataImportResult } from '../../services/dataInitialization';
import { Progress } from '../../../../src/components/ui/progress';

/**
 * Panel de gestion pour l'initialisation des données
 * Permet d'exporter et d'importer des données dans le système
 */
const DataInitializationPanel: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [exportOptions, setExportOptions] = useState<DataExportOptions>({
    includeEmployees: true,
    includeDepartments: true,
    includeRecruitment: true,
    includeTraining: false
  });
  const [importProgress, setImportProgress] = useState(0);
  const [importResult, setImportResult] = useState<DataImportResult | null>(null);

  const {
    exportData,
    importData,
    clearImportedData,
    hasImportedData,
    getLastImportDate
  } = useDataInitialization();

  // Gère les changements d'options d'export
  const handleExportOptionChange = (option: keyof DataExportOptions) => {
    if (typeof exportOptions[option] === 'boolean') {
      setExportOptions({
        ...exportOptions,
        [option]: !exportOptions[option as keyof DataExportOptions]
      });
    }
  };

  // Gère le changement de fichier sélectionné
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  // Lance l'exportation des données
  const handleExport = () => {
    exportData(exportOptions);
  };

  // Lance l'importation des données
  const handleImport = async () => {
    if (!selectedFile) return;
    
    // Simuler une progression
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);
    
    try {
      const result = await importData(selectedFile);
      setImportResult(result);
      setImportProgress(100);
      
      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setImportProgress(0);
        setSelectedFile(null);
      }, 3000);
    } catch (error) {
      setImportProgress(0);
      const errorResult: DataImportResult = {
        success: false,
        message: error instanceof Error ? error.message : "Erreur inconnue",
        total: 0,
        imported: 0,
        skipped: 0,
        errors: []
      };
      setImportResult(errorResult);
    } finally {
      clearInterval(interval);
    }
  };

  // Efface les données importées
  const handleClearData = () => {
    clearImportedData();
    setImportResult(null);
  };

  const lastImportDate = getLastImportDate();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" /> 
            Initialisation des données
          </CardTitle>
          <CardDescription>
            Exportez et importez des données pour initialiser ou sauvegarder votre système
          </CardDescription>
          {hasImportedData() && lastImportDate && (
            <Badge variant="outline" className="max-w-fit">
              Données personnalisées actives • Importé le {new Date(lastImportDate).toLocaleString()}
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="export">
              <AccordionTrigger className="font-medium">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> Exporter les données
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Sélectionnez les modules à exporter :
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="export-employees"
                          checked={exportOptions.includeEmployees}
                          onCheckedChange={() => handleExportOptionChange('includeEmployees')}
                        />
                        <Label htmlFor="export-employees">Employés</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="export-departments"
                          checked={exportOptions.includeDepartments}
                          onCheckedChange={() => handleExportOptionChange('includeDepartments')}
                        />
                        <Label htmlFor="export-departments">Départements</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="export-recruitment"
                          checked={exportOptions.includeRecruitment}
                          onCheckedChange={() => handleExportOptionChange('includeRecruitment')}
                        />
                        <Label htmlFor="export-recruitment">Recrutement</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="export-training"
                          checked={exportOptions.includeTraining}
                          onCheckedChange={() => handleExportOptionChange('includeTraining')}
                        />
                        <Label htmlFor="export-training">Formation</Label>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleExport} className="w-full sm:w-auto">
                    <Download className="h-4 w-4 mr-2" />
                    Exporter (JSON)
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="import">
              <AccordionTrigger className="font-medium">
                <div className="flex items-center gap-2">
                  <FileUp className="h-4 w-4" /> Importer des données
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="import-file">Fichier d'import (JSON)</Label>
                      <Input 
                        id="import-file" 
                        type="file" 
                        accept=".json"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  
                  {importProgress > 0 && (
                    <div className="space-y-2">
                      <Progress value={importProgress} className="h-2" />
                      <p className="text-sm text-center text-muted-foreground">
                        {importProgress < 100 ? 'Importation en cours...' : 'Importation terminée!'}
                      </p>
                    </div>
                  )}
                  
                  {importResult && (
                    <div className={`p-3 rounded-md ${importResult.success ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'}`}>
                      <p className={`text-sm font-medium ${importResult.success ? 'text-green-800' : 'text-red-800'}`}>
                        {importResult.success ? (
                          <span className="flex items-center">
                            <Check className="h-4 w-4 mr-1" />
                            {importResult.message}
                          </span>
                        ) : (
                          importResult.message
                        )}
                      </p>
                      {importResult.errors && importResult.errors.length > 0 && (
                        <ul className="mt-2 text-xs text-red-700 list-disc list-inside">
                          {importResult.errors.slice(0, 3).map((err, i) => (
                            <li key={i}>{err.message}</li>
                          ))}
                          {importResult.errors.length > 3 && (
                            <li>+ {importResult.errors.length - 3} autres erreurs</li>
                          )}
                        </ul>
                      )}
                    </div>
                  )}
                  
                  <Button 
                    onClick={handleImport} 
                    disabled={!selectedFile || importProgress > 0} 
                    className="w-full sm:w-auto"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Importer
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          {hasImportedData() ? (
            <Button variant="destructive" size="sm" onClick={handleClearData}>
              <Trash className="h-4 w-4 mr-2" />
              Supprimer les données importées
            </Button>
          ) : (
            <span className="text-sm text-muted-foreground">
              Utilisez des données simulées ou importez vos propres données
            </span>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataInitializationPanel;
