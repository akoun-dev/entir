
import React from 'react';
import { Input } from '../../../../../src/components/ui/input';
import { Label } from '../../../../../src/components/ui/label';
import { Textarea } from '../../../../../src/components/ui/textarea';
import { Palette } from 'lucide-react';
import { Department } from '../../../types/department';

interface DepartmentAppearanceProps {
  department: Pick<Department, 'color' | 'note'>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const DepartmentAppearance: React.FC<DepartmentAppearanceProps> = ({
  department,
  handleChange
}) => {
  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="color" className="text-base font-medium inline-flex items-center gap-2">
            <Palette className="w-4 h-4 text-ivory-orange" />
            Couleur
          </Label>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full border shadow-sm transition-all"
              style={{ backgroundColor: `hsl(${department.color * 30}, 70%, 50%)` }}
            ></div>
            <span className="text-sm font-medium">
              {department.color}/11
            </span>
          </div>
        </div>
        <Input
          id="color"
          name="color"
          type="range"
          min="0"
          max="11"
          value={department.color}
          onChange={handleChange}
          className="w-full h-2"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="note" className="text-base font-medium">Notes</Label>
        <Textarea
          id="note"
          name="note"
          value={department.note}
          onChange={handleChange}
          placeholder="Notes sur le département..."
          className="min-h-[120px] shadow-sm resize-y"
        />
      </div>
    </>
  );
};

export default DepartmentAppearance;
