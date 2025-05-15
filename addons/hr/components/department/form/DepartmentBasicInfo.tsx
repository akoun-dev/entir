
import React from 'react';
import { Input } from '../../../../../src/components/ui/input';
import { Label } from '../../../../../src/components/ui/label';
import { Switch } from '../../../../../src/components/ui/switch';
import { Department } from '../../../types/department';

interface DepartmentBasicInfoProps {
  department: Department;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
}

const DepartmentBasicInfo: React.FC<DepartmentBasicInfoProps> = ({
  department,
  handleChange,
  handleSwitchChange
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-medium">
            Nom du département <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={department.name}
            onChange={handleChange}
            placeholder="Informatique"
            className="h-11 shadow-sm"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="code" className="text-base font-medium">Code</Label>
          <Input
            id="code"
            name="code"
            value={department.code}
            onChange={handleChange}
            placeholder="IT"
            className="h-11 shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="complete_name" className="text-base font-medium">Nom complet</Label>
        <Input
          id="complete_name"
          name="complete_name"
          value={department.complete_name}
          onChange={handleChange}
          placeholder="Direction / Informatique"
          className="h-11 shadow-sm"
          disabled={!!department.parent_id}
        />
        {department.parent_id && (
          <p className="text-xs text-muted-foreground mt-1">
            Le nom complet est généré automatiquement à partir du département parent.
          </p>
        )}
      </div>

      <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg">
        <Switch
          id="active"
          checked={department.active}
          onCheckedChange={(checked) => handleSwitchChange('active', checked)}
          className="data-[state=checked]:bg-ivory-green"
        />
        <Label htmlFor="active" className="font-medium cursor-pointer">Département actif</Label>
      </div>
    </>
  );
};

export default DepartmentBasicInfo;
