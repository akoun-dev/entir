
export interface Company {
  id: string;
  name: string;
}

export interface ParentDepartment {
  id: string;
  complete_name: string;
}

export interface Manager {
  id: string;
  name: string;
  job_title: string;
}

export interface Department {
  id: string;
  name: string;
  complete_name: string;
  active: boolean;
  company_id: string;
  parent_id: string;
  manager_id: string;
  total_employee: number;
  note: string;
  color: number;
  parent_path: string;
  master_department_id: string;
  code: string;
}

export interface DepartmentFormProps {
  department: Department;
  companies: Company[];
  parentDepartments: ParentDepartment[];
  managers: Manager[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
}
