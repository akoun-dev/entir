
import { useState } from 'react';
import { useEmployee } from './useEmployee';
import { Employee } from '../models';

/**
 * Hook personnalisé pour la gestion de la vue des employés
 * Encapsule la logique d'affichage, de recherche et de suppression
 */
export const useEmployeeView = () => {
  const { employees, loading, error, loadEmployees, deleteEmployee } = useEmployee();
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);

  // Filtrer les employés en fonction du terme de recherche
  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (emp.job_title && emp.job_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (emp.department_name && emp.department_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Gestionnaire pour le clic sur supprimer
  const handleDeleteClick = (id: number) => {
    setEmployeeToDelete(id);
  };

  // Confirmation de suppression
  const confirmDelete = async () => {
    if (employeeToDelete) {
      try {
        await deleteEmployee(employeeToDelete);
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      } finally {
        setEmployeeToDelete(null);
      }
    }
  };

  // Annulation de suppression
  const cancelDelete = () => setEmployeeToDelete(null);

  return {
    employees,
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
  };
};
