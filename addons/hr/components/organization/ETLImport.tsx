
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '../../../../src/components/ui/dialog';
import { FileUp } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../../src/components/ui/tabs';
import { useETLImport, EMPLOYEE_FIELDS } from '../../hooks/useETLImport';

// Import our new components
import FileUploadTab from './import/FileUploadTab';
import MappingTab from './import/MappingTab';
import ConfigTab from './import/ConfigTab';
import ImportResultsTab from './import/ImportResultsTab';

const ETLImport: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    isApiMode,
    processingFile,
    handleFileChange,
    downloadTemplate,
    headerPreview,
    dataPreview,
    mappings,
    handleMappingChange,
    config,
    handleConfigChange,
    resetImport,
    handleImport,
    importStatus,
    importProgress,
    importResults,
    handleCancelImport,
    downloadErrorReport,
  } = useETLImport();

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <FileUp className="h-5 w-5" />
          Import massif d'employés
        </DialogTitle>
        <DialogDescription>
          Importez plusieurs employés à partir d'un fichier CSV ou Excel
        </DialogDescription>
      </DialogHeader>
      
      <div className="mt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="upload">1. Téléchargement</TabsTrigger>
            <TabsTrigger value="mapping" disabled={!headerPreview.length}>2. Mapping</TabsTrigger>
            <TabsTrigger value="config" disabled={!headerPreview.length || !mappings.length}>3. Configuration</TabsTrigger>
            <TabsTrigger value="import" disabled={importStatus === 'idle'}>4. Import</TabsTrigger>
          </TabsList>
          
          {/* Upload Tab */}
          <TabsContent value="upload">
            <FileUploadTab 
              isApiMode={isApiMode}
              processingFile={processingFile}
              handleFileChange={handleFileChange}
              downloadTemplate={downloadTemplate}
            />
          </TabsContent>
          
          {/* Mapping Tab */}
          <TabsContent value="mapping">
            <MappingTab 
              headerPreview={headerPreview}
              dataPreview={dataPreview}
              mappings={mappings}
              handleMappingChange={handleMappingChange}
              employeeFields={EMPLOYEE_FIELDS}
              resetImport={resetImport}
              onContinue={() => setActiveTab('config')}
            />
          </TabsContent>
          
          {/* Configuration Tab */}
          <TabsContent value="config">
            <ConfigTab 
              config={config}
              handleConfigChange={handleConfigChange}
              onGoBack={() => setActiveTab('mapping')}
              onStartImport={handleImport}
            />
          </TabsContent>
          
          {/* Import Tab */}
          <TabsContent value="import">
            <ImportResultsTab 
              importStatus={importStatus}
              importProgress={importProgress}
              importResults={importResults}
              onCancelImport={handleCancelImport}
              downloadErrorReport={downloadErrorReport}
              resetImport={resetImport}
              onFinish={() => setActiveTab('upload')}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ETLImport;
