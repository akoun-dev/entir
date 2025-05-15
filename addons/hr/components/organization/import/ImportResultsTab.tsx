
import React from 'react';
import { Button } from '../../../../../src/components/ui/button';
import { Progress } from '../../../../../src/components/ui/progress';
import { Card } from '../../../../../src/components/ui/card';
import { X, Download, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ImportResult {
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

interface ImportResultsTabProps {
  importStatus: 'idle' | 'processing' | 'success' | 'error' | 'cancelled';
  importProgress: number;
  importResults: ImportResult;
  onCancelImport: () => void;
  downloadErrorReport: () => void;
  resetImport: () => void;
  onFinish: () => void;
}

const ImportResultsTab: React.FC<ImportResultsTabProps> = ({
  importStatus,
  importProgress,
  importResults,
  onCancelImport,
  downloadErrorReport,
  resetImport,
  onFinish,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Progression de l'import</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">
              {importStatus === 'processing' && 'Import en cours...'}
              {importStatus === 'success' && 'Import terminé avec succès'}
              {importStatus === 'error' && 'Import terminé avec des erreurs'}
              {importStatus === 'cancelled' && 'Import annulé'}
            </span>
            <span className="text-sm font-medium">{importProgress}%</span>
          </div>
          <Progress value={importProgress} />
        </div>
      </div>
      
      {importStatus === 'processing' && (
        <div className="flex justify-center py-4">
          <Button 
            variant="outline" 
            onClick={onCancelImport}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Annuler l'import
          </Button>
        </div>
      )}
      
      {(importStatus === 'success' || importStatus === 'error') && (
        <div className="space-y-2 pt-4">
          <h3 className="text-sm font-medium flex items-center gap-1">
            {importStatus === 'success' ? (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            )}
            Résultats de l'import
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Total</div>
              <div className="text-2xl font-semibold">{importResults.total}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Créés</div>
              <div className="text-2xl font-semibold text-green-600">{importResults.created}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Mis à jour</div>
              <div className="text-2xl font-semibold text-blue-600">{importResults.updated}</div>
            </Card>
            <Card className="p-4">
              <div className="text-sm text-muted-foreground">Erreurs</div>
              <div className="text-2xl font-semibold text-red-600">{importResults.errors?.length || 0}</div>
            </Card>
          </div>
          
          {importResults.errors && importResults.errors.length > 0 && (
            <div className="flex items-center justify-center pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1"
                onClick={downloadErrorReport}
              >
                <Download className="h-3.5 w-3.5" />
                Télécharger le rapport d'erreurs
              </Button>
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-end space-x-2 pt-4">
        {(importStatus === 'success' || importStatus === 'error' || importStatus === 'cancelled') && (
          <Button variant="outline" onClick={resetImport}>Nouvel import</Button>
        )}
        {(importStatus === 'success' || importStatus === 'error' || importStatus === 'cancelled') && (
          <Button onClick={onFinish}>Terminer</Button>
        )}
      </div>
    </div>
  );
};

export default ImportResultsTab;
