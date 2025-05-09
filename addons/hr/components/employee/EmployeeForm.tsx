
import React, { FormEvent } from 'react';
import { Container } from '../../../../src/components/ui/container';
import EmployeeTabs from './EmployeeTabs';
import StatusCard from './StatusCard';
import ActionsCard from './ActionsCard';

interface EmployeeFormProps {
  employee: any;
  departments: { id: string; name: string; }[];
  managers: { id: string; name: string; }[];
  employmentTypes: { id: string; name: string; }[];
  isNewEmployee: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { name: string; value: string }) => void;
  onStatusChange: (checked: boolean) => void;
  onDelete: () => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  employee,
  departments,
  managers, 
  employmentTypes,
  isNewEmployee,
  onSubmit,
  onChange,
  onStatusChange,
  onDelete
}) => {
  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonne principale - Informations générales */}
        <div className="lg:col-span-2 space-y-6">
          <EmployeeTabs 
            employee={employee}
            departments={departments}
            managers={managers}
            employmentTypes={employmentTypes}
            onChange={onChange}
          />
        </div>

        {/* Colonne latérale - Statut et actions */}
        <div className="space-y-6">
          <StatusCard 
            isActive={employee.is_active} 
            onStatusChange={onStatusChange} 
          />
          
          <ActionsCard 
            isNewEmployee={isNewEmployee} 
            onSave={() => document.forms[0].requestSubmit()} 
            onDelete={onDelete} 
          />
        </div>
      </div>
    </form>
  );
};

export default EmployeeForm;
