
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../src/components/ui/tabs';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../../../src/components/ui/dialog';
import { Button } from '../../../../src/components/ui/button';
import { Settings } from 'lucide-react';
import { useOrgChartConfig } from '../../hooks/useOrgChartConfig';
import { ConfigCardFooter, AppearanceTabContent, DisplayTabContent, DragDropTabContent } from './config';

interface OrgChartConfigPanelProps {
  onClose: () => void;
}

const OrgChartConfigPanel: React.FC<OrgChartConfigPanelProps> = ({ onClose }) => {
  const { config, updateConfig, resetConfig } = useOrgChartConfig();
  const [activeTab, setActiveTab] = React.useState('display');

  const handleSave = () => {
    onClose();
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Configuration de l'organigramme
        </DialogTitle>
        <DialogDescription>
          Personnalisez l'affichage et le comportement de l'organigramme
        </DialogDescription>
      </DialogHeader>

      <div className="py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="display">Affichage</TabsTrigger>
            <TabsTrigger value="appearance">Apparence</TabsTrigger>
            <TabsTrigger value="dragdrop">Glisser-déposer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="display">
            <DisplayTabContent config={config} updateConfig={updateConfig} />
          </TabsContent>
          
          <TabsContent value="appearance">
            <AppearanceTabContent config={config} updateConfig={updateConfig} />
          </TabsContent>
          
          <TabsContent value="dragdrop">
            <DragDropTabContent config={config} updateConfig={updateConfig} />
          </TabsContent>
        </Tabs>
      </div>

      <DialogFooter className="flex justify-between pt-2">
        <Button variant="outline" onClick={resetConfig}>
          Réinitialiser
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Enregistrer
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};

export default OrgChartConfigPanel;
