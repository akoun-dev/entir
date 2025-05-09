
import React from 'react';
import { Button } from '../../../../src/components/ui/button';
import { HrDashboardMenu } from '../components';
import { DepartmentFormHeader } from '../../components/department';
import DepartmentTabs from '../../components/department/DepartmentTabs';
import { useDepartmentForm } from '../../hooks/useDepartmentForm';
import { ArrowLeft, Save } from 'lucide-react';

/**
 * Vue de création/édition d'un département
 */
const DepartmentFormView: React.FC = () => {
  const {
    department,
    companies,
    parentDepartments,
    managers,
    jobs,
    employees,
    isEditMode,
    handleChange,
    handleSelectChange,
    handleSwitchChange,
    handleSubmit,
    navigate
  } = useDepartmentForm();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* En-tête avec actions */}
      <DepartmentFormHeader 
        isEditMode={isEditMode} 
        onSubmit={handleSubmit} 
      />

      {/* Menu de navigation */}
      <HrDashboardMenu />

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="mt-8">
        <DepartmentTabs
          department={department}
          companies={companies}
          parentDepartments={parentDepartments}
          managers={managers}
          jobs={jobs}
          employees={employees}
          departmentId={department.id}
          isEditMode={isEditMode}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleSwitchChange={handleSwitchChange}
        />

        <div className="mt-8 flex justify-end gap-3">
          <Button 
            variant="outline" 
            type="button" 
            onClick={() => navigate('/hr/departments')}
            className="h-11 px-5 flex items-center gap-2 hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Annuler
          </Button>
          <Button 
            type="submit"
            className="h-11 px-5 bg-ivory-green hover:bg-ivory-green/90 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isEditMode ? 'Mettre à jour' : 'Créer'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentFormView;
