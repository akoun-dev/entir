
import { useState, useEffect } from 'react';
import { OdooHrService } from '../services';

interface Manager {
  id: string;
  name: string;
  job_title: string;
  avatar_url: string;
}

interface ParentDepartment {
  id: string;
  name: string;
}

interface Department {
  id: string;
  name: string;
  code: string;
  manager: Manager;
  parent: ParentDepartment;
  description: string;
  is_active: boolean;
  employee_count: number;
}

interface Employee {
  id: string;
  name: string;
  job_title: string;
  avatar_url: string;
  is_active: boolean;
}

interface SubDepartment {
  id: string;
  name: string;
  code: string;
  manager: { name: string };
  employee_count: number;
  is_active: boolean;
}

export const useDepartmentDetail = (departmentId: string) => {
  // State management
  const [department, setDepartment] = useState<Department>({
    id: '',
    name: '',
    code: '',
    manager: { id: '', name: '', job_title: '', avatar_url: '' },
    parent: { id: '', name: '' },
    description: '',
    is_active: true,
    employee_count: 0
  });
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [subDepartments, setSubDepartments] = useState<SubDepartment[]>([]);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get initials helper function
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Fetch department data
  useEffect(() => {
    const fetchDepartmentData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // In a real implementation, we would call the API with the departmentId
        // For now, we'll simulate an API call with a timeout
        const hrService = OdooHrService.getInstance();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock department data
        const mockDepartment = {
          id: departmentId,
          name: 'Informatique',
          code: 'IT',
          manager: { id: '2', name: 'Marie Martin', job_title: 'Chef de projet', avatar_url: '' },
          parent: { id: '1', name: 'Direction' },
          description: 'Département informatique responsable du développement et de la maintenance des systèmes d\'information.',
          is_active: true,
          employee_count: 15
        };
        
        // Mock employees data
        const mockEmployees = [
          { id: '1', name: 'Jean Dupont', job_title: 'Développeur Frontend', avatar_url: '', is_active: true },
          { id: '2', name: 'Marie Martin', job_title: 'Chef de projet', avatar_url: '', is_active: true },
          { id: '3', name: 'Pierre Durand', job_title: 'Développeur Backend', avatar_url: '', is_active: true },
          { id: '4', name: 'Sophie Lefebvre', job_title: 'Designer UI/UX', avatar_url: '', is_active: true },
          { id: '5', name: 'Thomas Bernard', job_title: 'Administrateur système', avatar_url: '', is_active: false }
        ];
        
        // Mock sub-departments data
        const mockSubDepartments = [
          { id: '6', name: 'Développement Web', code: 'DEV-WEB', manager: { name: 'Jean Dupont' }, employee_count: 8, is_active: true },
          { id: '7', name: 'Infrastructure', code: 'INFRA', manager: { name: 'Thomas Bernard' }, employee_count: 5, is_active: true }
        ];
        
        setDepartment(mockDepartment);
        setEmployees(mockEmployees);
        setSubDepartments(mockSubDepartments);
      } catch (err) {
        console.error('Error fetching department data:', err);
        setError('Une erreur est survenue lors du chargement des données du département.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (departmentId) {
      fetchDepartmentData();
    }
  }, [departmentId]);
  
  return {
    department,
    employees,
    subDepartments,
    isLoading,
    error,
    getInitials
  };
};

export type { Department, Employee, SubDepartment };
