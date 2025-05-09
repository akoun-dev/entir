/**
 * Interface pour un employé
 */
export interface Employee {
  id: number;
  name: string;
  job_title?: string;
  department_id?: number;
  department_name?: string;
  work_email?: string;
  email?: string; // Alias for work_email for compatibility
  work_phone?: string;
  phone?: string; // Alias for work_phone for compatibility
  address?: string;
  image?: string;
  parent_id?: number;
  manager_name?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Interface pour un département
 */
export interface Department {
  id: number;
  name: string;
  manager_id?: number;
  manager_name?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Interface pour un contrat
 */
export interface Contract {
  id: number;
  name: string;
  employee_id: number;
  employee_name?: string;
  contract_type: string;
  date_start: string;
  date_end?: string;
  wage: number;
  state: 'draft' | 'running' | 'expired' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interface pour un type de contrat
 */
export interface ContractType {
  id: number;
  name: string;
  description?: string;
  active: boolean;
}

/**
 * Interface pour un congé
 */
export interface Leave {
  id: number;
  employee_id: number;
  employee_name?: string;
  date_from: string;
  date_to: string;
  state: 'draft' | 'submitted' | 'approved' | 'refused' | 'cancelled';
  type: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interface pour une feuille de temps
 */
export interface Timesheet {
  id: number;
  employee_id: number;
  employee_name?: string;
  date: string;
  hours: number;
  description: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interface pour un poste
 */
export interface JobPosition {
  id: number;
  name: string;
  department_id?: number;
  department_name?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Interface pour les statistiques du tableau de bord RH
 */
export interface HrDashboardStats {
  totalEmployees: number;
  totalDepartments: number;
  activeLeaves: number;
  upcomingLeaves: number;
  employeesByDepartment: {
    departmentName: string;
    count: number;
  }[];
}
