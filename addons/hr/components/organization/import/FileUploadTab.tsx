
import React, { useRef } from 'react';
import { AlertTriangle, Database, Download, Loader2, Upload } from 'lucide-react';
import { Input } from '../../../../../src/components/ui/input';
import { Label } from '../../../../../src/components/ui/label';
import { Button } from '../../../../../src/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '../../../../../src/components/ui/alert';

interface FileUploadTabProps {
  isApiMode: boolean;
  processingFile: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  downloadTemplate: () => void;
}

const FileUploadTab: React.FC<FileUploadTabProps> = ({
  isApiMode,
  processingFile,
  handleFileChange,
  downloadTemplate,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      {isApiMode ? (
        <Alert variant="default" className="bg-green-50 text-green-800 border-green-200 mb-4">
          <Database className="h-4 w-4" />
          <AlertTitle>Mode API connecté</AlertTitle>
          <AlertDescription>
            L'import sera traité directement par le serveur API.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200 mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Mode démonstration</AlertTitle>
          <AlertDescription>
            Les données seront importées localement car aucune API n'est configurée.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-center w-full">
        <Label 
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {processingFile ? (
              <>
                <Loader2 className="w-8 h-8 mb-3 text-gray-400 animate-spin" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Analyse du fichier en cours...</span>
                </p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500">CSV, XLSX (max. 10MB)</p>
              </>
            )}
          </div>
          <Input
            id="file-upload"
            ref={fileInputRef}
            type="file" 
            accept=".csv,.xlsx,.xls" 
            className="hidden"
            onChange={handleFileChange}
            disabled={processingFile}
          />
        </Label>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">
          Besoin d'un modèle ? 
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={downloadTemplate}
          className="flex items-center gap-1"
        >
          <Download className="h-3.5 w-3.5" />
          Télécharger le modèle CSV
        </Button>
      </div>
    </div>
  );
};

export default FileUploadTab;
