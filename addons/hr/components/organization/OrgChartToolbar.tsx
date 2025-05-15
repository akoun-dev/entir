
import React from 'react';
import { Button } from '../../../../src/components/ui/button';
import { Input } from '../../../../src/components/ui/input';
import { Search, ZoomIn, ZoomOut, Download, Settings, FileUp, Save, Undo, Lock, Unlock } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent } from '../../../../src/components/ui/dialog';
import { toast } from 'sonner';
import OrgChartConfigPanel from './OrgChartConfig';
import ETLImport from './ETLImport';

interface OrgChartToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  scale: number;
  setScale: (scale: number) => void;
  editModeEnabled: boolean;
  setEditModeEnabled: (enabled: boolean) => void;
  readOnly: boolean;
  hasChanges: boolean;
  handleDiscardChanges: () => void;
  handleSaveChanges: () => void;
  handleExport: () => void;
  configDialogOpen: boolean;
  setConfigDialogOpen: (open: boolean) => void;
  importDialogOpen: boolean;
  setImportDialogOpen: (open: boolean) => void;
}

const OrgChartToolbar: React.FC<OrgChartToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  scale,
  setScale,
  editModeEnabled,
  setEditModeEnabled,
  readOnly,
  hasChanges,
  handleDiscardChanges,
  handleSaveChanges,
  handleExport,
  configDialogOpen,
  setConfigDialogOpen,
  importDialogOpen,
  setImportDialogOpen
}) => {
  const handleZoomIn = () => {
    setScale(Math.min(scale + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(Math.max(scale - 0.1, 0.5));
  };

  const toggleEditMode = () => {
    if (readOnly) {
      toast.error("L'organigramme est en lecture seule");
      return;
    }
    
    setEditModeEnabled(!editModeEnabled);
    if (!editModeEnabled) {
      toast.info("Mode édition activé - Glissez-déposez les employés pour réorganiser");
    } else {
      toast.info("Mode édition désactivé");
    }
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold">Organigramme</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un employé..."
            className="pl-10 h-10 w-64"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleZoomOut} title="Zoom arrière">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{Math.round(scale * 100)}%</span>
          <Button variant="outline" onClick={handleZoomIn} title="Zoom avant">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" onClick={handleExport} title="Exporter l'organigramme">
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
        
        {/* Toggle Edit Mode Button */}
        <Button 
          variant={editModeEnabled ? "default" : "outline"} 
          onClick={toggleEditMode}
          className={editModeEnabled ? "bg-amber-500 hover:bg-amber-600" : ""}
          title={editModeEnabled ? "Désactiver le mode édition" : "Activer le mode édition"}
        >
          {editModeEnabled ? (
            <Unlock className="h-4 w-4 mr-2" />
          ) : (
            <Lock className="h-4 w-4 mr-2" />
          )}
          {editModeEnabled ? "Mode Édition" : "Édition"}
        </Button>
        
        {/* Save/Discard Buttons - Only show when changes are made */}
        {hasChanges && (
          <>
            <Button 
              variant="outline" 
              onClick={handleDiscardChanges}
              title="Annuler les modifications"
            >
              <Undo className="h-4 w-4 mr-2" />
              Annuler
            </Button>
            <Button 
              onClick={handleSaveChanges}
              className="bg-green-600 hover:bg-green-700"
              title="Enregistrer les modifications"
            >
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </Button>
          </>
        )}
        
        {/* Import button with dialog */}
        <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" title="Importer des employés">
              <FileUp className="h-4 w-4 mr-2" />
              Import
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
            <ETLImport />
          </DialogContent>
        </Dialog>
        
        {/* Config button with dialog */}
        <Dialog open={configDialogOpen} onOpenChange={setConfigDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" title="Configurer l'organigramme">
              <Settings className="h-4 w-4 mr-2" />
              Config
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <OrgChartConfigPanel onClose={() => setConfigDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OrgChartToolbar;
