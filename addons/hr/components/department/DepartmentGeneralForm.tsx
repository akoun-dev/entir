
import React from 'react';
import { Separator } from '../../../../src/components/ui/separator';
import { DepartmentBasicInfo, DepartmentRelations, DepartmentAppearance } from './form';
import { DepartmentFormProps } from '../../types/department';

const DepartmentGeneralForm: React.FC<DepartmentFormProps> = ({
  department,
  companies,
  parentDepartments,
  managers,
  handleChange,
  handleSelectChange,
  handleSwitchChange
}) => {
  return (
    <div className="space-y-6">
      {/* Informations de base */}
      <DepartmentBasicInfo 
        department={department}
        handleChange={handleChange}
        handleSwitchChange={handleSwitchChange}
      />

      <Separator />

      {/* Relations (société, département parent, responsable) */}
      <DepartmentRelations
        department={department}
        companies={companies}
        parentDepartments={parentDepartments}
        managers={managers}
        handleSelectChange={handleSelectChange}
      />

      <Separator />

      {/* Apparence et notes */}
      <DepartmentAppearance
        department={department}
        handleChange={handleChange}
      />
    </div>
  );
};

export default DepartmentGeneralForm;
