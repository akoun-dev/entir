
import React from 'react';
import { Switch } from '../../../../../src/components/ui/switch';
import { Label } from '../../../../../src/components/ui/label';
import { Slider } from '../../../../../src/components/ui/slider';
import { Input } from '../../../../../src/components/ui/input';
import { Separator } from '../../../../../src/components/ui/separator';
import { OrgChartConfig } from '../../../hooks/useOrgChartConfig';

interface AppearanceTabContentProps {
  config: OrgChartConfig;
  updateConfig: (updates: Partial<OrgChartConfig>) => void;
}

const AppearanceTabContent: React.FC<AppearanceTabContentProps> = ({ config, updateConfig }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between space-x-2">
        <Label htmlFor="color-by-department" className="text-sm">Couleurs par département</Label>
        <Switch 
          id="color-by-department" 
          checked={config.colorByDepartment}
          onCheckedChange={(checked) => updateConfig({ colorByDepartment: checked })}
        />
      </div>

      {config.colorByDepartment && (
        <div className="space-y-2">
          <Label className="text-sm">Couleurs des départements</Label>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(config.departmentColors).map(([dept, color]) => (
              <div key={dept} className="flex items-center justify-between">
                <span className="text-sm">{dept}</span>
                <Input 
                  type="color" 
                  value={color} 
                  className="h-8 w-12"
                  onChange={(e) => {
                    const newColors = { ...config.departmentColors };
                    newColors[dept] = e.target.value;
                    updateConfig({ departmentColors: newColors });
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {!config.colorByDepartment && (
        <div className="flex items-center justify-between">
          <Label htmlFor="default-color" className="text-sm">Couleur par défaut</Label>
          <Input 
            id="default-color"
            type="color" 
            value={config.defaultNodeColor} 
            className="h-8 w-12"
            onChange={(e) => updateConfig({ defaultNodeColor: e.target.value })}
          />
        </div>
      )}

      <Separator />

      <div className="space-y-2">
        <Label className="text-sm">Taille des nœuds</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="node-width" className="text-sm">Largeur</Label>
              <span className="text-sm font-medium">{config.nodeWidth}px</span>
            </div>
            <Slider 
              id="node-width"
              min={48} 
              max={320} 
              step={8}
              value={[config.nodeWidth]}
              onValueChange={(value) => updateConfig({ nodeWidth: value[0] })}
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="node-height" className="text-sm">Hauteur</Label>
              <span className="text-sm font-medium">{config.nodeHeight}px</span>
            </div>
            <Slider 
              id="node-height"
              min={8} 
              max={32} 
              step={2}
              value={[config.nodeHeight]}
              onValueChange={(value) => updateConfig({ nodeHeight: value[0] })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceTabContent;
