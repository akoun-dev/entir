
import React from 'react';
import { TabContent } from '../common';
import DepartmentGeneralForm from './DepartmentGeneralForm';
import { Department, Company, ParentDepartment, Manager } from '../../types/department';

interface TabGeneralProps {
  department: Department;
  companies: Company[];
  parentDepartments: ParentDepartment[];
  managers: Manager[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  isEditMode: boolean;
}

const TabGeneral: React.FC<TabGeneralProps> = ({
  department,
  companies,
  parentDepartments,
  managers,
  handleChange,
  handleSelectChange,
  handleSwitchChange,
  isEditMode
}) => {
  return (
    <TabContent 
      title="Informations générales" 
      description="Informations de base du département"
    >
      <DepartmentGeneralForm
        department={department}
        companies={companies}
        parentDepartments={parentDepartments}
        managers={managers}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        handleSwitchChange={handleSwitchChange}
      />
    </TabContent>
  );
};

export default TabGeneral;
