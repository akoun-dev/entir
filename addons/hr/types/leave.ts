
/**
 * Interface pour un type de congé
 */
export interface LeaveType {
  id: string;
  name: string;
  code: string;
  color: string;
  limit_days?: number;
  requires_approval: boolean;
  active: boolean;
}

/**
 * Interface pour un congé
 */
export interface Leave {
  id: string;
  employee_id: string;
  employee_name?: string;
  date_from: string;
  date_to: string;
  number_of_days: number;
  state: 'draft' | 'submitted' | 'approved' | 'refused' | 'cancelled';
  type: string;
  type_name?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interface pour la demande de congé
 */
export interface LeaveRequest {
  employee_id: string;
  date_from: string;
  date_to: string;
  type: string;
  description?: string;
}

/**
 * Interface pour le solde de congés
 */
export interface LeaveBalance {
  id: string;
  employee_id: string;
  employee_name?: string;
  leave_type_id: string;
  leave_type_name?: string;
  total_allocated: number;
  total_taken: number;
  remaining: number;
  year: number;
}
