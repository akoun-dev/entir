
/**
 * Types pour l'organigramme
 */

export interface OrgChartPerson {
  id: string;
  name: string;
  position: string;
  department: string;
  email?: string;
  phone?: string;
  imageUrl?: string;
  children?: OrgChartPerson[];
  // Extended attributes for org chart
  isManager?: boolean;
  level?: number;
  startDate?: string;
  employmentType?: string;
  location?: string;
  customAttributes?: Record<string, any>;
  
  // Drag and drop related attributes
  isDragging?: boolean;
  isDropTarget?: boolean;
}

export interface OrgChartDepartment {
  id: string;
  name: string;
  manager?: OrgChartPerson;
  employees: OrgChartPerson[];
  subDepartments?: OrgChartDepartment[];
  // Extended attributes for org chart
  description?: string;
  parentDepartmentId?: string;
  code?: string;
  color?: string;
  managerTitle?: string;
  customAttributes?: Record<string, any>;
}

export interface OrgChartData {
  rootPerson?: OrgChartPerson;
  departments: OrgChartDepartment[];
}

// Configuration for org chart appearance and behavior
export interface OrgChartConfiguration {
  showEmail: boolean;
  showPhone: boolean;
  showDepartment: boolean;
  showPosition: boolean;
  colorByDepartment: boolean;
  departmentColors: Record<string, string>;
  defaultNodeColor: string;
  nodeWidth: number;
  nodeHeight: number;
  maxDepth: number;
  displayMode: 'hierarchical' | 'flat' | 'department';
  
  // Drag and drop related configuration
  allowDragDrop?: boolean;
  restrictDragToSameLevel?: boolean;
  confirmOnDrop?: boolean;
  animateDragDrop?: boolean;
}

// Interface for the drag and drop operations
export interface OrgChartDragDropOperation {
  sourceId: string;
  destinationId: string;
  personId: string;
  position: number;
  timestamp: number;
}

// Interface for tracking changes in the org chart
export interface OrgChartChanges {
  operations: OrgChartDragDropOperation[];
  modifiedAt: number;
  modifiedBy?: string;
}
