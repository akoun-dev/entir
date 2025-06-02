import { useState, useCallback, useEffect } from 'react';
import { Employee } from '../types';
import { employeeService } from '../services';

/**
 * Hook pour gérer la liste des employés
 *
 * Ce hook fournit des fonctionnalités pour charger et filtrer la liste des employés.
 */
export const useEmployees = () => {
  // États pour les employés
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // État pour les filtres
  const [filters, setFilters] = useState({
    name: '',
    department: '',
    position: '',
    status: 'all' // 'all', 'active', 'inactive'
  });

  // Charger tous les employés
  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await employeeService.getAll();
      setEmployees(data);

      // Appliquer les filtres actuels
      applyFilters(data, filters);

      return data;
    } catch (err) {
      console.error('Erreur lors du chargement des employés:', err);
      setError('Impossible de charger la liste des employés.');
      return [];
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Appliquer les filtres à la liste des employés
  const applyFilters = useCallback((employeesList: Employee[], currentFilters = filters) => {
    let filtered = [...employeesList];

    // Filtre par nom
    if (currentFilters.name) {
      const searchTerm = currentFilters.name.toLowerCase();
      filtered = filtered.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filtre par département
    if (currentFilters.department) {
      filtered = filtered.filter(employee =>
        employee.department_name?.toLowerCase() === currentFilters.department.toLowerCase()
      );
    }

    // Filtre par poste
    if (currentFilters.position) {
      filtered = filtered.filter(employee =>
        employee.job_title?.toLowerCase().includes(currentFilters.position.toLowerCase())
      );
    }

    // Filtre par statut
    if (currentFilters.status !== 'all') {
      const isActive = currentFilters.status === 'active';
      filtered = filtered.filter(employee => employee.is_active === isActive);
    }

    setFilteredEmployees(filtered);
  }, [filters]);

  // Mettre à jour les filtres
  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    applyFilters(employees, updatedFilters);
  }, [filters, employees, applyFilters]);

  // Réinitialiser les filtres
  const resetFilters = useCallback(() => {
    const defaultFilters = {
      name: '',
      department: '',
      position: '',
      status: 'all'
    };

    setFilters(defaultFilters);
    applyFilters(employees, defaultFilters);
  }, [employees, applyFilters]);

  // Charger les employés au montage du composant
  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  return {
    employees,
    filteredEmployees,
    loading,
    error,
    filters,
    loadEmployees,
    updateFilters,
    resetFilters
  };
};

export default useEmployees;