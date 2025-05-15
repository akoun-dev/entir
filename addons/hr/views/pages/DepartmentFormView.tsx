
import React, { useEffect } from 'react';
import { Button } from '../../../../src/components/ui/button';
import { toast } from '../../../../src/hooks/use-toast';
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

  useEffect(() => {
    // Verify data is loaded correctly
    if (isEditMode && !department.id) {
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les données du département.",
        variant: "destructive"
      });
    }
  }, [isEditMode, department.id]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      handleSubmit(e);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'enregistrement.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full">
      {/* En-tête avec actions */}
      <DepartmentFormHeader
        isEditMode={isEditMode}
        onSubmit={handleSubmit}
      />

      {/* Menu de navigation */}
      <HrDashboardMenu />

      {/* Formulaire */}
      <form onSubmit={onSubmit} className="mt-8 w-full">
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
