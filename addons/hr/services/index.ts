/**
 * Services du module HR
 * Ces services servent d'interface entre le frontend et le backend
 */

// Import des services
import employeeServiceImport from './employeeService';
import departmentServiceImport from './departmentService';
import contractServiceImport from './contractService';
import leaveServiceImport from './leaveService';
import recruitmentServiceImport from './recruitmentService';
import trainingServiceImport from './trainingService';
import { OdooHrService } from './OdooHrService';

// Export des services individuels
export { default as employeeService } from './employeeService';
export { default as departmentService } from './departmentService';
export { default as contractService } from './contractService';
export { default as leaveService } from './leaveService';
export { default as recruitmentService } from './recruitmentService';
export { default as trainingService } from './trainingService';
export { OdooHrService } from './OdooHrService';

// Service principal qui regroupe tous les services
export const hrService = {
  employees: employeeServiceImport,
  departments: departmentServiceImport,
  contracts: contractServiceImport,
  leaves: leaveServiceImport,
  recruitment: recruitmentServiceImport,
  training: trainingServiceImport,
  odoo: OdooHrService.getInstance()
};

export default hrService;
