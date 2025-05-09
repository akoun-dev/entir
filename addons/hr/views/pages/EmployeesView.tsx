
import React, { useEffect } from 'react';
import { HrLayout } from '../components';
import EmployeeViewHeader from '../components/EmployeeViewHeader';
import EmployeeSearchBar from '../components/EmployeeSearchBar';
import EmployeeViewTabs from '../components/EmployeeViewTabs';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import { useEmployeeView } from '../../hooks/useEmployeeView';

/**
 * Page de liste des employés
 */
const EmployeesView: React.FC = () => {
  const {
    filteredEmployees,
    searchTerm,
    setSearchTerm,
    loading,
    error,
    loadEmployees,
    employeeToDelete,
    handleDeleteClick,
    confirmDelete,
    cancelDelete
  } = useEmployeeView();

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <HrLayout>
      <div className="w-full">
        {/* En-tête avec actions */}
        <EmployeeViewHeader />

        {/* Barre de recherche et filtres */}
        <EmployeeSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Contenu principal avec onglets */}
        <EmployeeViewTabs
          loading={loading}
          error={error}
          filteredEmployees={filteredEmployees}
          onDelete={handleDeleteClick}
        />

        {/* Dialogue de confirmation de suppression */}
        <DeleteConfirmationDialog
          isOpen={employeeToDelete !== null}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      </div>
    </HrLayout>
  );
};

export default EmployeesView;
