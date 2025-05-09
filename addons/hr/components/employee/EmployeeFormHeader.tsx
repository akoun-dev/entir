
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../../../src/components/ui/breadcrumb';
import { User } from 'lucide-react';

interface EmployeeFormHeaderProps {
  isNewEmployee: boolean;
}

const EmployeeFormHeader: React.FC<EmployeeFormHeaderProps> = ({ isNewEmployee }) => {
  const pageTitle = isNewEmployee ? 'Nouvel employé' : 'Modifier un employé';
  
  return (
    <>
      {/* Fil d'Ariane */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/hr">RH</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/hr/employees">Employés</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* En-tête de la page */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-6 w-1.5 bg-amber-500 rounded-full"></div>
        <User className="h-6 w-6 text-amber-500" />
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
      </div>
    </>
  );
};

export default EmployeeFormHeader;
