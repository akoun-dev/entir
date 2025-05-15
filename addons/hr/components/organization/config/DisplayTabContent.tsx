
import React from 'react';
import { Switch } from '../../../../../src/components/ui/switch';
import { Label } from '../../../../../src/components/ui/label';
import { Slider } from '../../../../../src/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '../../../../../src/components/ui/radio-group';
import { Separator } from '../../../../../src/components/ui/separator';
import { OrgChartConfig } from '../../../hooks/useOrgChartConfig';

interface DisplayTabContentProps {
  config: OrgChartConfig;
  updateConfig: (updates: Partial<OrgChartConfig>) => void;
}

const DisplayTabContent: React.FC<DisplayTabContentProps> = ({ config, updateConfig }) => {
  const handleDisplayModeChange = (value: string) => {
    updateConfig({ displayMode: value as 'hierarchical' | 'flat' | 'department' });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Informations affichées</h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="show-position" className="text-sm">Position</Label>
            <Switch 
              id="show-position" 
              checked={config.showPosition}
              onCheckedChange={(checked) => updateConfig({ showPosition: checked })}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="show-department" className="text-sm">Département</Label>
            <Switch 
              id="show-department" 
              checked={config.showDepartment}
              onCheckedChange={(checked) => updateConfig({ showDepartment: checked })}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="show-email" className="text-sm">Email</Label>
            <Switch 
              id="show-email" 
              checked={config.showEmail}
              onCheckedChange={(checked) => updateConfig({ showEmail: checked })}
            />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="show-phone" className="text-sm">Téléphone</Label>
            <Switch 
              id="show-phone" 
              checked={config.showPhone}
              onCheckedChange={(checked) => updateConfig({ showPhone: checked })}
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="max-depth" className="text-sm">Profondeur maximale</Label>
          <span className="text-sm font-medium">{config.maxDepth}</span>
        </div>
        <Slider 
          id="max-depth"
          min={1} 
          max={10} 
          step={1}
          value={[config.maxDepth]}
          onValueChange={(value) => updateConfig({ maxDepth: value[0] })}
        />
      </div>

      <Separator />

      <div className="space-y-2">
        <Label className="text-sm">Mode d'affichage</Label>
        <RadioGroup 
          value={config.displayMode} 
          onValueChange={handleDisplayModeChange}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hierarchical" id="hierarchical" />
            <Label htmlFor="hierarchical" className="text-sm">Hiérarchique</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="flat" id="flat" />
            <Label htmlFor="flat" className="text-sm">Liste à plat</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="department" id="department" />
            <Label htmlFor="department" className="text-sm">Par département</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default DisplayTabContent;
