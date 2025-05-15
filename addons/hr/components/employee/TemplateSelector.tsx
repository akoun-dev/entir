
import React from 'react';
import { Label } from '../../../../src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../src/components/ui/select';
import { TemplateSelectorProps } from '../../hooks/employee-profile/types';

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onTemplateChange,
  label = "Sélectionner un template"
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="template">{label}</Label>
      <Select
        value={selectedTemplate}
        onValueChange={onTemplateChange}
      >
        <SelectTrigger id="template" className="w-full">
          <SelectValue placeholder="Choisir un template" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TemplateSelector;
