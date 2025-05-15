// Define a standardized Employee interface to avoid ambiguity
export interface Employee {
  id: string;
  name: string;
  job_title?: string;
  department_id?: string;
  department_name?: string; // Added for easier access
  work_email?: string;
  work_phone?: string;
  manager_id?: string;
  manager_name?: string; // Added for easier access
  is_active: boolean;
  photo?: string; // Photo field for storing image URL or base64 data
  position?: string; // Added for compatibility with org chart
  notes?: string; // Added notes field for employee profile
  // Added fields for org chart
  parent_id?: string; // Direct superior in hierarchy
  children?: string[]; // Direct subordinates IDs
  level?: number; // Level in organizational hierarchy (0 = root)
  org_unit_id?: string; // Organizational unit/department
  org_unit_path?: string; // Path of org units (e.g. "Company/Finance/Accounting")
  location?: string; // Physical location or office
  custom_attributes?: Record<string, any>; // For any additional custom fields
}

// Other employee-related types can be defined here
export interface EmployeeFormData extends Employee {
  address?: string;
  notes?: string;
}

// Interface for importing employees
export interface EmployeeImportData {
  name: string;
  email?: string;
  work_phone?: string;
  job_title?: string;
  department?: string;
  manager?: string;
  is_active?: boolean;
  [key: string]: any; // Allow for additional custom fields
}

// Interface for the import result
export interface ImportResult {
  total: number;
  created: number;
  updated: number;
  skipped: number;
  failed: number;
  errors?: Array<{
    row: number;
    message: string;
    data: Record<string, any>;
  }>;
}
