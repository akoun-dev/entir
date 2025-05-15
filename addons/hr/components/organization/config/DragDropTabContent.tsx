
import React from 'react';
import { Switch } from '../../../../../src/components/ui/switch';
import { Label } from '../../../../../src/components/ui/label';
import { Separator } from '../../../../../src/components/ui/separator';
import { OrgChartConfig } from '../../../hooks/useOrgChartConfig';

interface DragDropTabContentProps {
  config: OrgChartConfig;
  updateConfig: (updates: Partial<OrgChartConfig>) => void;
}

const DragDropTabContent: React.FC<DragDropTabContentProps> = ({ config, updateConfig }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="allow-dragdrop" className="text-sm">Activer le glisser-déposer</Label>
        <Switch 
          id="allow-dragdrop" 
          checked={config.allowDragDrop ?? true}
          onCheckedChange={(checked) => updateConfig({ allowDragDrop: checked })}
        />
      </div>
      
      <Separator />
      
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="restrict-drag" className="text-sm">Limiter au même niveau hiérarchique</Label>
        <Switch 
          id="restrict-drag" 
          checked={config.restrictDragToSameLevel ?? false}
          onCheckedChange={(checked) => updateConfig({ restrictDragToSameLevel: checked })}
        />
        <div className="text-xs text-muted-foreground ml-2">
          Limite le déplacement des employés au même niveau hiérarchique
        </div>
      </div>
      
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="confirm-drop" className="text-sm">Demander confirmation</Label>
        <Switch 
          id="confirm-drop" 
          checked={config.confirmOnDrop ?? true}
          onCheckedChange={(checked) => updateConfig({ confirmOnDrop: checked })}
        />
        <div className="text-xs text-muted-foreground ml-2">
          Affiche une confirmation avant d'appliquer les changements
        </div>
      </div>
      
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="animate-dragdrop" className="text-sm">Animation</Label>
        <Switch 
          id="animate-dragdrop" 
          checked={config.animateDragDrop ?? true}
          onCheckedChange={(checked) => updateConfig({ animateDragDrop: checked })}
        />
        <div className="text-xs text-muted-foreground ml-2">
          Active les animations lors des déplacements
        </div>
      </div>
    </div>
  );
};

export default DragDropTabContent;
