
import React from 'react';
import { Input } from '../../../../src/components/ui/input';
import { Textarea } from '../../../../src/components/ui/textarea';
import { EditableFieldProps } from '../../hooks/employee-profile/types';

const EditableField: React.FC<EditableFieldProps> = ({
  value,
  isEditing,
  onChange,
  className = "",
  placeholder = "",
  label,
  type = "text"
}) => {
  if (isEditing) {
    if (type === 'textarea') {
      return (
        <div className="space-y-1">
          {label && <div className="text-sm font-medium">{label}</div>}
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="min-h-[100px]"
          />
        </div>
      );
    }
    
    return (
      <div className="space-y-1">
        {label && <div className="text-sm font-medium">{label}</div>}
        <Input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    );
  }
  
  if (!value && !isEditing) {
    return (
      <div className={`text-muted-foreground italic ${className}`}>
        {placeholder}
      </div>
    );
  }
  
  return (
    <div className={className}>
      {label && <div className="text-sm font-medium">{label}</div>}
      {value}
    </div>
  );
};

export default EditableField;
