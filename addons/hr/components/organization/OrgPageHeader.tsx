
import React from 'react';
import { Button } from '../../../../src/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '../../../../src/components/ui/dialog';
import { Separator } from '../../../../src/components/ui/separator';
import { Badge } from '../../../../src/components/ui/badge';
import { 
  Save, 
  Upload, 
  Settings, 
  Users, 
  Database,
  AlertTriangle
} from 'lucide-react';
import ETLImport from './ETLImport';
import OrgChartConfigPanel from './OrgChartConfig';
import ApiConfigDialog from './ApiConfigDialog';

interface OrgPageHeaderProps {
  hasUnsavedChanges: boolean;
  onSave: () => void;
  importDialogOpen: boolean;
  setImportDialogOpen: (open: boolean) => void;
  configDialogOpen: boolean;
  setConfigDialogOpen: (open: boolean) => void;
  isApiMode?: boolean;
  onApiConfigSave?: () => void;
}

const OrgPageHeader: React.FC<OrgPageHeaderProps> = ({
  hasUnsavedChanges,
  onSave,
  importDialogOpen,
  setImportDialogOpen,
  configDialogOpen,
  setConfigDialogOpen,
  isApiMode = false,
  onApiConfigSave = () => {}
}) => {
  const [apiConfigOpen, setApiConfigOpen] = React.useState(false);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-2.5 bg-amber-500 rounded-full"></div>
          <div className="h-12 w-12 bg-amber-500 rounded-full flex items-center justify-center">
            <Users size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Organigramme</h1>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-gray-500">Structure organisationnelle de l'entreprise</p>
              {isApiMode ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                  <Database className="h-3 w-3 mr-1" />
                  API connectée
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Mode démonstration
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {hasUnsavedChanges && (
            <Button 
              onClick={onSave}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
          )}
          
          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
              <ETLImport />
            </DialogContent>
          </Dialog>
          
          <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configuration
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <OrgChartConfigPanel onClose={() => setConfigDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          
          <Dialog open={apiConfigOpen} onOpenChange={setApiConfigOpen}>
            <DialogTrigger asChild>
              <Button>
                <Database className="h-4 w-4 mr-2" />
                API
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <ApiConfigDialog 
                onClose={() => setApiConfigOpen(false)}
                onSave={onApiConfigSave}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Separator className="mb-6" />
    </>
  );
};

export default OrgPageHeader;
