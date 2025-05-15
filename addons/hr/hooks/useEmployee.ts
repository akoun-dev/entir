
import { useState, useEffect } from 'react';
import { Employee } from '../models/types';
import { employeeService } from '../services';

/**
 * Hook pour gérer les données d'employé
 * @returns Fonctions et états pour manipuler les employés
 */
export const useEmployee = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  /**
   * Charge tous les employés
   */
  const loadEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError('Erreur lors du chargement des employés');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Charge un employé par son ID
   * @param id ID de l'employé
   */
  const loadEmployeeById = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await employeeService.getEmployeeById(id);
      setCurrentEmployee(data);
    } catch (err) {
      setError(`Erreur lors du chargement de l'employé ${id}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Crée un nouvel employé
   * @param employee Données de l'employé
   */
  const createEmployee = async (employee: Partial<Employee>) => {
    setLoading(true);
    setError(null);
    try {
      const newEmployee = await employeeService.createEmployee(employee);
      setEmployees(prev => [...prev, newEmployee]);
      return newEmployee;
    } catch (err) {
      setError('Erreur lors de la création de l\'employé');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Met à jour un employé existant
   * @param id ID de l'employé
   * @param employee Données à mettre à jour
   */
  const updateEmployee = async (id: number, employee: Partial<Employee>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedEmployee = await employeeService.updateEmployee(id, employee);
      setEmployees(prev => 
        prev.map(emp => emp.id === id ? updatedEmployee : emp)
      );
      if (currentEmployee?.id === id) {
        setCurrentEmployee(updatedEmployee);
      }
      return updatedEmployee;
    } catch (err) {
      setError(`Erreur lors de la mise à jour de l'employé ${id}`);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Supprime un employé
   * @param id ID de l'employé
   */
  const deleteEmployee = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await employeeService.deleteEmployee(id);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      if (currentEmployee?.id === id) {
        setCurrentEmployee(null);
      }
      return true;
    } catch (err) {
      setError(`Erreur lors de la suppression de l'employé ${id}`);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Met à jour la photo d'un employé
   * @param id ID de l'employé
   * @param photoData Données de la photo (URL ou base64)
   */
  const updateEmployeePhoto = async (id: number, photoData: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedEmployee = await employeeService.updateEmployee(id, { photo: photoData });
      setEmployees(prev => 
        prev.map(emp => emp.id === id ? updatedEmployee : emp)
      );
      if (currentEmployee?.id === id) {
        setCurrentEmployee(updatedEmployee);
      }
      return updatedEmployee;
    } catch (err) {
      setError(`Erreur lors de la mise à jour de la photo de l'employé ${id}`);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    employees,
    currentEmployee,
    loading,
    error,
    loadEmployees,
    loadEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    updateEmployeePhoto
  };
};
